using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class ProductRepository : IProductRepository {

        private readonly ShopDbContext _dbContext;

        public ProductRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>> All() {
            return await ProductGenericQuery().ToArrayAsync();
        }

        public IEnumerable<Product> AllByCategory(string category) {
            return ProductGenericQuery().Where(product => product.Category.Name == category);
        }

        public async Task<Product?> FindById(int id) {
            return await ProductGenericQuery().FirstOrDefaultAsync(product => product.Id == id);
        }

        public async Task<Product?> FindByName(string name) {
            return await ProductGenericQuery().FirstOrDefaultAsync(product => product.Name == name);
        }

        private IIncludableQueryable<Product, Category> ProductGenericQuery() {
            return _dbContext.Products
                .Include(p => p.Images)
                .Include(p => p.Category);
        }

        public void AddProduct(Product product) {
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
        }

        public void SaveProduct(Product product) {
            _dbContext.Products.Update(product);
            _dbContext.SaveChanges();
        }

    }
}