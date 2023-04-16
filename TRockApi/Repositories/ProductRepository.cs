using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class ProductRepository : IProductRepository{
        
        private readonly ShopDbContext _dbContext;


        public ProductRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Product>> All() {
            return await _dbContext.Products.ToArrayAsync();
        }
        
        public IEnumerable<Product> AllByCategory(string category) {
            return _dbContext.Products.Where(product => product.Category.Name == category);
        }

        public async Task<Product?> FindById(int id) {
            return await _dbContext.Products.FirstOrDefaultAsync(product => product.Id == id);
        }
        
        public async Task<Product?> FindByName(string name) {
            return await _dbContext.Products.FirstOrDefaultAsync(product => product.Name == name);
        }

        public void AddProduct(Product product) {
            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();
        }

    }
}