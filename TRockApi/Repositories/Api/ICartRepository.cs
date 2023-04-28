using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface ICartRepository {
        public Cart? FindCartByUser(int userId);
    }
}