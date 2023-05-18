using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface ICartRepository {
        public Cart? FindCartByUser(int userId);

        public void Update(Cart cart);
        
        public void Store(Cart cart);

        public void DeleteCart(Cart cart);
        
        public void DeleteCartItem(CartItem cartItem);

        public void SaveChanges();
    }
}