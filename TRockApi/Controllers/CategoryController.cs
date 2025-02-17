using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Requests;
using TRockApi.Response;

namespace TRockApi.Controllers {
    
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoryController : ControllerBase {

        private readonly ICategoryRepository _categoryRepository;
        private readonly ICategoryHandling _categoryHandling;

        public CategoryController(ICategoryRepository categoryRepository, ICategoryHandling categoryHandling) {
            _categoryRepository = categoryRepository;
            _categoryHandling = categoryHandling;
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> Index() {
            return await _categoryRepository.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Category>> Get(int id) {
            var foundCategory = await _categoryRepository.FindByIdAsync(id);

            if (foundCategory == null) {
                return new NotFoundResult();
            }

            return foundCategory;
        }

        [HttpPost("create")]
        public async Task<CreateEntityResponse> Create(CreateCategoryRequest request) {
            await _categoryHandling.CreateCategoryAsync(request.Name, request.Caption);

            var createdCategory = _categoryRepository.FindByName(request.Name);

            return new CreateEntityResponse(createdCategory!.Id);
        }
    }
}