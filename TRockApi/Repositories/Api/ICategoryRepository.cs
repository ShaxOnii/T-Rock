using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface ICategoryRepository {
        Category? FindByName(string name);
    }
}