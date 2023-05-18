using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class ProductOrderRepository : IProductOrderRepository {

        private readonly ShopDbContext _dbContext;

        public ProductOrderRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        public IEnumerable<ProductOrder> All() {
            return _dbContext.ProductOrders
                .Include(order => order.User)
                .Include(order => order.Items)
                .ThenInclude(item => item.Product)
                .ToArray();
        }

        public ProductOrder? FindById(int id) {
            return _dbContext.ProductOrders
                .Include(order => order.User)
                .Include(order => order.Items)
                .ThenInclude(item => item.Product)
                .FirstOrDefault(order => order.Id == id);
        }
        
        public int Store(ProductOrder productOrder) {
            var id = _dbContext.ProductOrders.Add(productOrder).Entity.Id;
            _dbContext.SaveChanges();

            return id;
        }
    }
}