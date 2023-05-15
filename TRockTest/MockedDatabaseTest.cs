using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;
using DbContext = System.Data.Entity.DbContext;

namespace TRockTest {
    public abstract class MockedDatabaseTest {
        
        protected ShopDbContext DbContext = null!;

        private readonly User _user = new User {
            Id = 1,
            Login = "Andrew",
            Email = "andre@aa.aa",
            Password = "test",
            Roles = new List<Role>()
        };

        private readonly Category _category = new() {
            Id = 1,
            Name = "All",
            Caption = "All products"
        };

        protected void SetupDbContext() {
            var builder = new DbContextOptionsBuilder<ShopDbContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString());
            var options = builder.Options;
            
            DbContext = new ShopDbContext(options);
            
            SetupDatabase();
        }

        private void SetupDatabase() {
            DbContext.Users.Add(_user);
            DbContext.Categories.Add(_category);
            
            DbContext.SaveChanges();
        }

        protected User GetUser() {
            return _user;
        }
        protected Product CreateMockedProduct(int id) {

            Product product = new Product {
                Id = id,
                Name = "Product_" + id,
                Caption = "Test Product " + id,
                Category = _category,
                Price = 100,
                Description = "An example description",
            };

            DbContext.Products.Add(product);
            DbContext.SaveChanges();

            return product;
        }

        protected void MockCart(List<CartItem> items) {
            var userCart = new Cart {
                Id = 1,
                User = _user,
                Items = items
            };

            DbContext.Carts.Add(userCart);
            DbContext.SaveChanges();
        }

        protected Cart GetCart() {
           return DbContext.Carts.FirstOrDefault( cart => cart.User.Id ==  _user.Id)!;
        }

        protected ProductOrder GetProductOrder(int id) {
            return DbContext.ProductOrders.FirstOrDefault(order => order.Id == id)!;
        }
    }
}