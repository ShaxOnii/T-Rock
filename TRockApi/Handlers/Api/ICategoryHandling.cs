using TRockApi.Repositories.Models;

namespace TRockApi.Handlers.Api {
    public interface ICategoryHandling {
        Task CreateCategoryAsync(string name, string caption);
    }
}