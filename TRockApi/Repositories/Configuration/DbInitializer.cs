using System.Linq;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public static class DbInitializer {
        public static void Initialize(ShopContext context) {
            context.Database.EnsureCreated();

            if (context.Users.Any()) {
                return;
            }

            var admin = new User {
                Login = "Administrator",
                Email = "test@test.example",
                Password = "admin",
                Role = Role.Administrator
            };

            context.Users.Add(admin);

            context.SaveChanges();
        }
    }
}