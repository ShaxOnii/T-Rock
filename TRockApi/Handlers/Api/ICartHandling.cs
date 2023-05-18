using System.Collections.Generic;
using System.Threading.Tasks;
using TRockApi.Repositories.Models;

namespace TRockApi.Handlers.Api {
    public interface ICartHandling {
        Task AddCartItems(User user, IEnumerable<CartChanges> cartChanges);

        void RemoveCartItems(User user, IEnumerable<CartChanges> cartChanges);

        void CleanCart(User user);
    }
}