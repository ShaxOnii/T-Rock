using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class CartResponse {


        public static CartResponse FromModel(Cart cart) {
            return new CartResponse();
        }
    }
}