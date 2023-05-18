using System;
using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ProductOrderItemResponse {

        public int Id { get; set; }
        
        public float Price { get; set; }
        
        public int Quantity { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public Product Product { get; set; }
        
        public static ProductOrderItemResponse FromModel(ProductOrderItem model) {
            return new ProductOrderItemResponse {
                Id = model.Id,
                Price = model.Price,
                Quantity = model.Quantity,
                CreationDate = model.CreationDate,
                Product = model.Product
            };
        }
    }
}