using System.Threading.Tasks;

namespace TRockApi.Handlers.Api {
    public interface IProductHandling {
        Task CreateProductAsync(string name, string caption, string categoryName);
        
        void CreateProduct(string name, string caption, string categoryName);

    }
}