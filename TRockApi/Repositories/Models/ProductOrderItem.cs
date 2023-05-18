using System;

namespace TRockApi.Repositories.Models {
    public class ProductOrderItem {
        public int Id { get; set; }

        public float Price { get; set; }

        public int Qunatity { get; set; }

        public DateTime CreationDate { get; set; }

        public Product Product { get; set; }

        public ProductOrder Order { get; set; }
    }
}