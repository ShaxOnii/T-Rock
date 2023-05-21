
using System.Collections.Generic;
using System.Linq;

namespace TRockApi.Repositories.Models {
    public class Cart {

        public int Id { get; set; }
        
        public User User { get; set; }

        public List<CartItem> Items { get; set; } = new();

        public float TotalPrice() {
            return Items.Select(item => item.TotalPrice()).Sum();
        }
        
        public CartItem? GetCartItemForProduct(Product product) {
            return Items.FirstOrDefault(item => item.Product.Id == product.Id);
        }
        
    }
}