using System.Collections.Generic;
using System.Linq;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public static class DbInitializer {
        public static void Initialize(ShopDbContext dbContext) {
            dbContext.Database.EnsureCreated();
            
            var roles = new List<Role> {
                new() {Name = "Admin"},
                new() {Name = "Client"}
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
            
            dbContext.SaveChanges();
        }
    }
}