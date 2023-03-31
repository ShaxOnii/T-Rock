using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ProductResponse {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }
        public float Price { get; set; }
        
        public string Description { get; set; }

        public static ProductResponse FromModel(Product product) {
            return new ProductResponse {
                Id = product.Id,
                Name = product.Name,
                Caption = product.Caption,
                Price = product.Price,
                Description = product.Description
            };
        }
    }
}