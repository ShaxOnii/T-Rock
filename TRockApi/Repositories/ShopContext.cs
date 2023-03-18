using Microsoft.EntityFrameworkCore;
using TRockApi.Models;

namespace TRockApi.Repositories {
    public class ShopContext : DbContext {

        public ShopContext(DbContextOptions<ShopContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}