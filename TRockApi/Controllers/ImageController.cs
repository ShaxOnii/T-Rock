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

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IEnumerable<ImageLinkResponse>> Index() {
            var images = await _imageRepository.GetALl();
            var baseUri = Request.PathBase;

            return images.Select(i => ImageLinkResponse.FromModel(baseUri, i));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> Get(int id) {
            var image = await _imageRepository.GetById(id);

            if (image == null) {
                return new NotFoundResult();
            }

            var decodedImage = Convert.FromBase64String(image.Content);

            return new FileContentResult(decodedImage, $"image/{image.Extension}");
        }


        [Authorize(Roles = "Admin")]
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
            var fileType = Path.GetExtension(request.Filename);

            if (!availableExtensions.Contains(fileType)) {
                return BadRequest();
            }

            var image = new Image {
                Filename = request.Filename,
                Extension = fileType,
                Content = Convert.ToBase64String(decodedImage.CloneByteArray())
            };

            var id = await _imageRepository.StoreImage(image);

            return new CreateEntityResponse(id);
        }

        [Authorize(Roles = "Admin")]
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