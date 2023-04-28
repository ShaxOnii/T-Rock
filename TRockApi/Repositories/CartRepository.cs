using System.Linq;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class CartRepository : ICartRepository {
        private readonly ShopDbContext _dbContext;

        public CartRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        public Cart? FindCartByUser(int userId) {
            return _dbContext.Carts.FirstOrDefault(cart => cart.User.Id == userId);
        }
        
    }
}