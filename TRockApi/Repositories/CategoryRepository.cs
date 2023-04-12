using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class CategoryRepository : ICategoryRepository {

        private readonly ShopDbContext _dbContext;

        public CategoryRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        public Category? FindByName(string name) {
            return _dbContext.Categories.FirstOrDefault(category => category.Name == name);
        }

        public Task<List<Category>> GetAllAsync() {
            return _dbContext.Categories.ToListAsync();
        }

        public Task<Category?> FindByIdAsync(int id) {
            return _dbContext.Categories.FirstOrDefaultAsync(category => category.Id == id);
        }

        public Task CreateCategoryAsync(string name, string caption) {
            var category = new Category {
                Name = name,
                Caption = caption
            };

            _dbContext.Categories.Add(category);
            return _dbContext.SaveChangesAsync();
        }
    }
}