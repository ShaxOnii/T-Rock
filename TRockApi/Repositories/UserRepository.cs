using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class UserRepository : IUserRepository {

        private readonly ShopDbContext _dbContext;

        public UserRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<User?> FindByLogin(string login) {
            return await _dbContext.Users
                .Include(u => u.Roles)
                .FirstOrDefaultAsync(u => u.Login == login);
        }

        public async Task AddUser(User user) {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public bool EmailExists(string email) {
            return _dbContext.Users.Any(user => user.Email == email);
        }

        public bool LoginExists(string login) {
            return _dbContext.Users.Any(user => user.Login == login);
        }

        public Role GetRoleByName(string name) {
            return _dbContext.Roles.First(r => r.Name == name);
        }
    }
}