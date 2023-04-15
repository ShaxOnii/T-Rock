using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Requests;
using TRockApi.Response;

namespace TRockApi.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class ProductController {

        private readonly IProductRepository _productRepository;

        private readonly IProductHandling _productHandling;

        public ProductController(IProductRepository productRepository, IProductHandling productHandling) {
            _productRepository = productRepository;
            _productHandling = productHandling;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductResponse>> Index([FromQuery(Name = "category")] string? category) {
            IEnumerable<Product> result;
    
            if (category != null) {
                result = _productRepository.AllByCategory(category);
            } else {
                result = await _productRepository.All();

            }

            return result.Select(ProductResponse.FromModel);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductResponse>> Get(int id) {
            var product = await _productRepository.FindById(id);

            if (product == null) {
                return new NotFoundResult();
            }

            return ProductResponse.FromModel(product);
        }

        [HttpPost("create")]
        public async Task<ActionResult<CreateEntityResponse>> Create(CreateProductRequest request) {
            await _productHandling.CreateProductAsync(request.Name, request.Caption, request.Category);

            var createdProduct = await _productRepository.FindByName(request.Name);

            return new CreateEntityResponse {
                Id = createdProduct!.Id
            };
        }

        [HttpPost("change/{id:int}")]
        public async Task<IEnumerable<ProductResponse>> Change(int id, ChangeProductRequest request) {
            throw new NotImplementedException();
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IEnumerable<ProductResponse>> Delete(int id) {
            throw new NotImplementedException();
        }
    }
}