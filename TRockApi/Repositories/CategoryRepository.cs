using System.Linq;
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
    }
}