using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ProductOrderResponse {



        public static ProductOrderResponse FromModel(ProductOrder model) {
            return new ProductOrderResponse();
        }
    }
}