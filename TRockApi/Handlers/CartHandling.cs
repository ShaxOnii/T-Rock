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
                return;
            }

            AddCartItemForProduct(cart, product, cartChange.QuantityChange);
        }


        private void AddCartItemForProduct(Cart cart, Product product, int quantity) {
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

        public void RemoveCartItems(User user, IEnumerable<CartChanges> cartChanges) {
            var userCart = _cartRepository.FindCartByUser(user.Id);

            if (userCart != null) {
                foreach (var cartChange in cartChanges) { 
                    RemoveCartItem(userCart, cartChange);
                }
                
                _cartRepository.SaveChanges();
            }
        }

        private void RemoveCartItem(Cart cart, CartChanges cartChange) {
            var changedCartItem = cart.Items.FirstOrDefault(item => item.Product.Id == cartChange.ProductId);

            if (changedCartItem == null) {
                return;
            }

            changedCartItem.Quantity += cartChange.QuantityChange;

            if (changedCartItem.Quantity <= 0) {
                cart.Items = cart.Items.FindAll(item => item.Id != changedCartItem.Id);
                _cartRepository.DeleteCartItem(changedCartItem);
            }

            _cartRepository.Update(cart);
        }

    }
}