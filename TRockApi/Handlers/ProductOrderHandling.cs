using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockApi.Handlers {
    public class ProductOrderHandling : IProductOrderHandling {

        private readonly IProductOrderRepository _productOrderRepository;

        public ProductOrderHandling(IProductOrderRepository productOrderRepository) {
            _productOrderRepository = productOrderRepository;
        }

        public Task<int> CreateProductOrderFromCart(Cart cart) {
            var items = CreateItemsForCartItems(cart.Items);
            
            var productOrder = new ProductOrder {
                State = "WaitingForPayment",
                User = cart.User,
                CreationDate = DateTime.Now,
                Items = items
            };

            var orderId = _productOrderRepository.Store(productOrder);
            
            return Task.FromResult(orderId);
        }

        private List<ProductOrderItem> CreateItemsForCartItems(List<CartItem> cartItems) {
            return cartItems.Select(CreateItemForCartItem).ToList();
        }

        private ProductOrderItem CreateItemForCartItem(CartItem cartItem) {
            var calculatedPrice = CalculatePriceForCartItem(cartItem);

            return new ProductOrderItem {
                Price = calculatedPrice,
                Qunatity = cartItem.Quantity,
                CreationDate = DateTime.Now,
                Product = cartItem.Product
            };
        }

        private float CalculatePriceForCartItem(CartItem cartItem) {
            return cartItem.Quantity * cartItem.Product.Price;
        }
    }
}