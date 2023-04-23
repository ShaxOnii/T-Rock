using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public class ShopDbContext : DbContext {

        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<CartItem> CartItems { get; set; }

    }
}