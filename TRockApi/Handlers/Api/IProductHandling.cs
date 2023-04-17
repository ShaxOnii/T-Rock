using System.Threading.Tasks;
using TRockApi.Repositories.Models;

namespace TRockApi.Handlers.Api {
    public interface IProductHandling {
        Task CreateProductAsync(string name, string caption, string categoryName);

        Task<Product> ChangeProductAsync(int productId, ProductChanges changes);
        
    }
}