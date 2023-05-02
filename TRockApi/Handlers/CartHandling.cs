using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockApi.Handlers {
    public class CartHandling : ICartHandling {

        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;

        public CartHandling(ICartRepository cartRepository, IProductRepository productRepository) {
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }


        /*
         *  Koszyki:
         *

         *
         *      Ususwanie Itemka:
         *          1. Znajdz koszyk
         *          2. Sprawdz czy w koszyki jest juz produkt 
         *           - TAK -> Usun o quantity i jesli jest mniej niz zero wywal CartItem
         *           - NIE -> nic sie nie dzieje
         *          3. zapisz koszyk
         *
         * 
         */


        public async Task AddCartItems(User user, IEnumerable<CartChanges> cartChanges) {
            Cart userCart = _cartRepository.FindCartByUser(user.Id) ?? CreateCartForUser(user);

            foreach (var cartChange in cartChanges) {
                await AddCartItem(userCart, cartChange);
            }

            _cartRepository.SaveChanges();
        }

        private async Task AddCartItem(Cart cart, CartChanges cartChange) {
            var product = await _productRepository.FindById(cartChange.ProductId);

            if (product == null) {
                // TODO: error
                return;
            }

            UpdateOrCreateCartItemForProduct(cart, product, cartChange.Quantity);
        }

        private void UpdateOrCreateCartItemForProduct(Cart cart, Product product, int quantity) {
            var item = cart.Items.FirstOrDefault(item => item.Product.Id == product.Id);

            if (item == null) {
                CreateCartItemForProduct(cart, product, quantity);
            } else {
                item.Quantity += quantity;
                _cartRepository.Update(cart);
            }

        }

        private void CreateCartItemForProduct(Cart cart, Product product, int quantity) {
            var item = new CartItem {
                Product = product,
                Quantity = quantity
            };

            cart.Items.Add(item);
        }

        private Cart CreateCartForUser(User user) {
            var cart = new Cart {
                User = user
            };

            _cartRepository.Store(cart);

            return cart;
        }
    }
}