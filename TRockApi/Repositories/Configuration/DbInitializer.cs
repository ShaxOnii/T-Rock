using System.Collections.Generic;
using System.Linq;
using TRockApi.Repositories.Models;
using TRockApi.Security;

namespace TRockApi.Repositories.Configuration {
    public static class DbInitializer {
        public static void Initialize(ShopDbContext dbContext) {
            dbContext.Database.EnsureCreated();

            var roles = new List<Role> {
                new() {Name = Roles.ADMIN_ROLE},
                new() {Name = Roles.CLIENT_ROLE}
            };

            var admin = new User {
                Login = "Administrator",
                Email = "test@test.example",
                Password = "admin",
                Roles = roles
            };

            if (!dbContext.Roles.Any()) {
                foreach (var role in roles) {
                    dbContext.Roles.Add(role);
                }

            }

            if (!dbContext.Users.Any()) {
                dbContext.Users.Add(admin);
            }

            if (!dbContext.Categories.Any()) {
                dbContext.Categories.Add(new Category {
                    Name = "All",
                    Caption = "All Products"
                });
            }

            dbContext.SaveChanges();
        }
    }
}