using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ProductOrderItemResponse {



        public static ProductOrderItemResponse FromModel(ProductOrderItem model) {
            return new ProductOrderItemResponse();
        }
    }
}