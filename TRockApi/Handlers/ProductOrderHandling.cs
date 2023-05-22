using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Utils.Errors;
using ProductOrderModel = TRockApi.Repositories.Models.ProductOrder;

namespace TRockApi.Handlers {
    public class ProductOrderHandling : IProductOrderHandling {

        private readonly IProductOrderRepository _productOrderRepository;
        private readonly ICartHandling _cartHandling;

        public ProductOrderHandling(IProductOrderRepository productOrderRepository, ICartHandling cartHandling) {
            _productOrderRepository = productOrderRepository;
            _cartHandling = cartHandling;
        }

        public Task<int> CreateProductOrderFromCart(Cart cart) {
            if (cart.Items.IsNullOrEmpty()) {
                throw new CannotCreateProductOrderFromEmptyCartError();
            }

            var items = CreateItemsForCartItems(cart.Items);

            var productOrder = new ProductOrderModel {
                State = new WaitingForPayment().Name(),
                User = cart.User,
                CreationDate = DateTime.Now,
                Items = items
            };

            var orderId = _productOrderRepository.Store(productOrder);
            _cartHandling.CleanCart(cart.User);

            return Task.FromResult(orderId);
        }

        private List<ProductOrderItem> CreateItemsForCartItems(List<CartItem> cartItems) {
            return cartItems.Select(CreateItemForCartItem).ToList();
        }

        private ProductOrderItem CreateItemForCartItem(CartItem cartItem) {
            return new ProductOrderItem {
                Price = cartItem.Product.Price,
                Quantity = cartItem.Quantity,
                CreationDate = DateTime.Now,
                Product = cartItem.Product
            };
        }

        public void ChangeProductOrderState(int productOrderId, string stateName) {
            var productOrderModel = _productOrderRepository.FindById(productOrderId) ??
                                    throw new EntityNotFoundError(productOrderId, "ProductOrder");
            var productOrder = new ProductOrder(productOrderModel);
            var state = ProductOrderStates.FromString(stateName);

            productOrder.ChangeState(state);

            _productOrderRepository.Update(productOrder.Model());
        }
    }
}