using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Requests;
using TRockApi.Response;
using TRockApi.Utils.Errors;

namespace TRockApi.Controllers {

    [ApiController]
    [Route("/api/[controller]")]
    public class ImageController : AbstractController {

        private readonly IImageRepository _imageRepository;

        public ImageController(IUserRepository userRepository, IImageRepository imageRepository)
            : base(userRepository) {
            _imageRepository = imageRepository;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<ImageLinkResponse>> Index() {
            var images = await _imageRepository.GetALl();

            return images.Select(i => ImageLinkResponse.FromModel(BaseUrl(), i));
        }

        private string BaseUrl() {
            var prefix = Request.IsHttps ? "https" : "http";
            
            return prefix + "://" + Request.Host;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> Get(int id) {
            var image = await _imageRepository.GetById(id);

            if (image == null) {
                return new NotFoundResult();
            }

            return new FileContentResult(image.Content, $"image/{image.Extension}");
        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CreateEntityResponse>> AddImage(AddImageRequest request) {

            var decodedImage = Convert.FromBase64String(request.Content);

            if (decodedImage.IsNullOrEmpty() || request.Filename.IsNullOrEmpty()) {
                return BadRequest();
            }

            if (decodedImage.Length > Image.IMAGE_MAX_SIZE) {
                throw new MaximumImageSizeExceeded(request.Filename);
            }

            var availableExtensions = new HashSet<string> {"png", "jpg"};
            var fileType = Path.GetExtension(request.Filename).TrimStart('.');

            if (!availableExtensions.Contains(fileType)) {
                return BadRequest();
            }

            var image = new Image {
                Filename = request.Filename,
                Extension = fileType,
                Content = decodedImage.CloneByteArray(),
            };

            var id = await _imageRepository.StoreImage(image);

            return new CreateEntityResponse(id);
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteImage(int id) {
            var foundImage = await _imageRepository.GetById(id);

            if (foundImage != null) {
                await _imageRepository.DeleteImage(foundImage);
            }

            return new OkResult();
        }
    }
}