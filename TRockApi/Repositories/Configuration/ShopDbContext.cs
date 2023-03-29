using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public class ShopDbContext : DbContext {

        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) {

        }
        

        public DbSet<User> Users { get; set; }
        
    }
}