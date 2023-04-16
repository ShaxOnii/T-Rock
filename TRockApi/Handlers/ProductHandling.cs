using System.Threading.Tasks;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Utils.Errors;

namespace TRockApi.Handlers {
    public class ProductHandling : IProductHandling {
        private readonly IProductRepository _productRepository;

        private readonly ICategoryRepository _categoryRepository;

        public ProductHandling(IProductRepository productRepository, ICategoryRepository categoryRepository) {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task CreateProductAsync(string name, string caption, string categoryName) {
            await Task.Run(() => CreateProduct(name, caption, categoryName));
        }

        public void CreateProduct(string name, string caption, string categoryName) {
            var category = _categoryRepository.FindByName(categoryName);

            ValidateProductNotExists(name);
            ValidateCategory(category, categoryName);

            _productRepository.AddProduct(
                new Product {
                    Name = name,
                    Caption = caption,
                    Category = category!,
                    Description = ""
                }
            );
        }

        private void ValidateProductNotExists(string productName) {
            if (_productRepository.FindByName(productName).Result != null) {
                throw new CreateProductError("Product with name '" + productName + "' exists.");
            }
        }

        private void ValidateCategory(Category? category, string categoryName) {
            if (category == null) {
                throw new CreateProductError("Category '" + categoryName + "' not exists.");
            }
        }
    }
}