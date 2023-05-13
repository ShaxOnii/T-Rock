using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface IProductOrderRepository {

        public IEnumerable<ProductOrder> All();

        public ProductOrder? FindById(int id);
    }
}