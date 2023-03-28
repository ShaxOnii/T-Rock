using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class ShopContext : DbContext {

        public ShopContext(DbContextOptions<ShopContext> options) : base(options) {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.ApplyConfiguration(new CharacteristicEntityConfiguration());
        }

        public DbSet<User> Users { get; set; }
        
        public DbSet<CharacteristicModel> Characteristics { get; set; }
    }
}