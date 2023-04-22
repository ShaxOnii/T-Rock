using System.Collections.Generic;

namespace TRockApi.Repositories.Models {
    public class Cart {

        public int Id { get; set; }
        
        public User User { get; set; }

        public IEnumerable<CartItem> Items { get; set; }
        
    }
}