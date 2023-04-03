using System.Threading.Tasks;
using TRockApi.Handlers.Api;
using TRockApi.Repositories;
using TRockApi.Repositories.Models;
using TRockApi.Utils.Errors;

namespace TRockApi.Handlers {
    public class ProductHandling : Handler, IProductHandling {
        private readonly ProductRepository _productRepository;

        private readonly CategoryRepository _categoryRepository;

        public ProductHandling(ProductRepository productRepository, CategoryRepository categoryRepository) {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task CreateProductAsync(string name, string caption, string categoryName) {
           await Task.Run(() => CreateProduct(name, caption, categoryName));
        }

        public void CreateProduct(string name, string caption, string categoryName) {
            var category = _categoryRepository.FindByName(categoryName);

            Validate(category != null, new CreateProductError("Category '" + categoryName + "' not exists."));
            Validate(ProductNotExists(name), new CreateProductError("Product '" + name + "' exists."));

            _productRepository.AddProduct(
                new Product {
                    Name = name,
                    Caption = caption,
                    Category = category!
                }
            );
        }

        private bool ProductNotExists(string productName) {
            return _productRepository.FindByName(productName).Result == null;
        }
    }
}