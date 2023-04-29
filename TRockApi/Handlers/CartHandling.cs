using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockApi.Handlers {
    public class CartHandling {

        private readonly ICartRepository _cartRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;

        public CartHandling(ICartRepository cartRepository, IUserRepository userRepository,
            IProductRepository productRepository) {
            _cartRepository = cartRepository;
            _userRepository = userRepository;
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
        }


        /*      Dodawanie itemka:
        *          1. Znajdz koszyk lub stwórz
        *          2. Sprawdz czy w koszyki jest juz produkt
        *              - TAK -> Dodaj quantity
        *              - NIE -> Dodaj Item z quantity i wstaw do koszyka
        *          3. Zapisz koszyk
        */

        private async Task AddCartItem(Cart cart, CartChanges cartChange) {
            var product = await _productRepository.FindById(cartChange.productId);

            if (product == null) {
                // TODO: error
                return;
            }

            UpdateOrCreateCartItemForProduct(cart, product, cartChange.count);

        }

        private void UpdateOrCreateCartItemForProduct(Cart cart, Product product, int quantity) {
            var item = cart.Items.FirstOrDefault(item => item.Product.Id == product.Id);

            if (item == null) {
                item = CreateCartItemForProduct(cart, product);
            }

            item.Quantity += quantity;
        }

        private CartItem CreateCartItemForProduct(Cart cart, Product product) {
            var item = new CartItem {
                Product = product
            };

            cart.Items.Add(item);

            return item;
        }

        private Cart CreateCartForUser(User user) {
            return new Cart {
                User = user
            };
        }
    }
}