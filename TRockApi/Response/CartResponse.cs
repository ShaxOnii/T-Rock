using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class CartResponse {

        public IEnumerable<CartItemResponse>? Items { get; set; }

        public class CartItemResponse {

            public ProductResponse? Product { get; set; }
            
            public int Quantity { get; set; }

            public static CartItemResponse FromModel(CartItem cartItem) {
                return new CartItemResponse {
                    Product = ProductResponse.FromModel(cartItem.Product),
                    Quantity = cartItem.Quantity
                };
            }
        }

        public static CartResponse FromModel(Cart cart) {
            return new CartResponse {
                Items = cart.Items.Select(CartItemResponse.FromModel)
            };
        }
    }
}