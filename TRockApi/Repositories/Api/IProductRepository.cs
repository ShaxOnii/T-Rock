using System.Collections.Generic;
using System.Threading.Tasks;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface IProductRepository {
        
        Task<IEnumerable<Product>> All();
        
        Task<Product?> FindById(int id);

        public Task<Product?> FindByName(string name);
        
        void AddProduct(Product product);

    }
}