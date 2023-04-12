using System.Collections.Generic;
using System.Threading.Tasks;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface ICategoryRepository {
        Category? FindByName(string name);

        Task<List<Category>> GetAllAsync();

        Task<Category?> FindByIdAsync(int id);

        Task CreateCategoryAsync(string name, string caption);
        
    }
}