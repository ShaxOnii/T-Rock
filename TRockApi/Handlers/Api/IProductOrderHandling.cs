using TRockApi.Repositories.Models;

namespace TRockApi.Handlers.Api {
    public interface IProductOrderHandling {

        Task<int> CreateProductOrderFromCart(Cart cart);
        
    }
}