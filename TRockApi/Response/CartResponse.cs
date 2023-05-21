using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class CartResponse {
        
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public IEnumerable<CartItemResponse>? Items { get; set; }
        
        public float TotalPrice { get; set; }

        public class CartItemResponse {

            public ProductResponse? Product { get; set; }
            
            public int Quantity { get; set; }
            
            public float TotalPrice { get; set; }

            public static CartItemResponse FromModel(CartItem cartItem) {
                return new CartItemResponse {
                    Product = ProductResponse.FromModel(cartItem.Product),
                    Quantity = cartItem.Quantity,
                    TotalPrice = cartItem.TotalPrice()
                };
            }
        }

        public static CartResponse FromModel(Cart cart) {
            return new CartResponse {
                Items = cart.Items.Select(CartItemResponse.FromModel),
                TotalPrice = cart.TotalPrice()
            };
        }
    }
}