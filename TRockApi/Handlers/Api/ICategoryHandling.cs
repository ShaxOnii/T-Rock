using System.Threading.Tasks;

namespace TRockApi.Handlers.Api {
    public interface ICategoryHandling {
        Task CreateCategoryAsync(string name, string caption);
    }
}