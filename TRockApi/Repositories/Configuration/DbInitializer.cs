using System.Linq;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public static class DbInitializer {
        public static void Initialize(ShopDbContext dbContext) {
            dbContext.Database.EnsureCreated();

            if (dbContext.Users.Any()) {
                return;
            }

            var admin = new User {
                Login = "Administrator",
                Email = "test@test.example",
                Password = "admin",
                Role = Role.Administrator
            };

            dbContext.Users.Add(admin);

            dbContext.SaveChanges();
        }
    }
}