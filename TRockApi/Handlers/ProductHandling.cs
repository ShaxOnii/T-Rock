using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Utils.Errors;

namespace TRockApi.Handlers {
    public class ProductHandling : IProductHandling {
        private readonly IProductRepository _productRepository;

        private readonly ICategoryRepository _categoryRepository;

        private readonly IImageRepository _imageRepository;

        public ProductHandling(
            IProductRepository productRepository,
            ICategoryRepository categoryRepository,
            IImageRepository imageRepository
        ) {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _imageRepository = imageRepository;
        }

        public Task CreateProductAsync(string name, string caption, string categoryName) {
            return Task.Run(() => CreateProduct(name, caption, categoryName));
        }

        public Task<Product> ChangeProductAsync(int productId, ProductChanges changes) {
            return Task.Run(() => ChangeProduct(productId, changes));
        }

        private Product ChangeProduct(int id, ProductChanges changes) {
            var product = GetProduct(id);

            if (changes.Caption != null) {
                product.Caption = changes.Caption;
            }

            if (changes.Price.HasValue) {
                product.Price = changes.Price.Value;
            }

            if (changes.Description != null) {
                product.Description = changes.Description;
            }

            if (changes.CategoryName != null) {
                var newCategory = _categoryRepository.FindByName(changes.CategoryName);
                if (newCategory != null) {
                    product.Category = newCategory;
                }
            }

            LinkImages(product, changes.Images);

            ValidateProduct(product);

            _productRepository.SaveProduct(product);

            return product;
        }

        private void LinkImages(Product product, List<int> imageIds) {
            var notLinkedImages = imageIds.FindAll(
                id => !product.Images.Exists(image => image.Id == id)
            );

            foreach (var imageId in notLinkedImages) {
                var image = _imageRepository.GetById(imageId).Result;

                if (image != null) {
                    product.Images.Add(image);
                }
            }
        }

        private void ValidateProduct(Product product) {
            HashSet<Error> errors = new();

            if (product.Price < 0) {
                errors.Add(
                    new EntityValidationError(product.Id, "price", "Price should be greater than 0")
                );
            }

            if (!errors.IsNullOrEmpty()) {
                throw new MultipleErrors(errors);
            }
        }

        private Product GetProduct(int productId) {
            var product = _productRepository.FindById(productId).Result;

            if (product == null) {
                throw new EntityNotFoundError(productId, "Product");
            }

            return product;
        }

        private void CreateProduct(string name, string caption, string categoryName) {
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