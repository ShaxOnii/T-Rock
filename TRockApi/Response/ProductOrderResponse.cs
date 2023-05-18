using System;
using System.Collections.Generic;
using System.Linq;
using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ProductOrderResponse {

        public int Id { get; set; }
        
        public string State { get; set; }
        
        public DateTime CreationDate { get; set; }
        
        public IEnumerable<ProductOrderItemResponse> Items { get; set; }

        public static ProductOrderResponse FromModel(ProductOrder model) {
            return new ProductOrderResponse {
                Id = model.Id,
                State = model.State,
                CreationDate = model.CreationDate,
                Items = model.Items.Select(ProductOrderItemResponse.FromModel)
            };
        }
    }
}