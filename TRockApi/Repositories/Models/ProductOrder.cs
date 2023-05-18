using System;
using System.Collections.Generic;
using System.Linq;

namespace TRockApi.Repositories.Models {
    public class ProductOrder {
        public int Id { get; set; }

        public string State { get; set; }

        public User User { get; set; }

        public DateTime CreationDate { get; set; }

        public IEnumerable<ProductOrderItem> Items { get; set; }


        public ProductOrderItem? FindItemByProductId(int id) {
            return Items.FirstOrDefault(item => item.Product.Id == id);
        }
        
    }
}