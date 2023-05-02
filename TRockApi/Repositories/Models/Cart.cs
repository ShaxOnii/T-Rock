using System.Collections.Generic;

namespace TRockApi.Repositories.Models {
    public class Cart {

        public int Id { get; set; }
        
        public User User { get; set; }

        public List<CartItem> Items { get; set; } = new List<CartItem>();

    }
}