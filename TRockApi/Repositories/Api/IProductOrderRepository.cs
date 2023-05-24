using System.Collections.Generic;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface IProductOrderRepository {

        IEnumerable<ProductOrder> All();
        
        IEnumerable<ProductOrder> AllByUserId(int userId);
        
        ProductOrder? FindById(int id);

        int Store(ProductOrder productOrder);
        
        void Update(ProductOrder productOrder);
    }
}