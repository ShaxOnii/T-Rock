using TRockApi.Repositories.Models;

namespace TRockApi.Handlers.Api {
    public interface ICartHandling {
        Task AddCartItems(User user, IEnumerable<CartChanges> cartChanges);

        Task RemoveCartItems(User user, IEnumerable<CartChanges> cartChanges);

    }
}