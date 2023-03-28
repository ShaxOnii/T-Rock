using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public class ShopDbContext : DbContext {

        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.ApplyConfiguration(new CharacteristicEntityConfiguration());
        }

        public DbSet<User> Users { get; set; }
        
        public DbSet<CharacteristicModel> Characteristics { get; set; }
    }
}