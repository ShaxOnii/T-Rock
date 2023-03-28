using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class UserRepository : IUserRepository {

        private readonly ShopContext _context;

        public UserRepository(ShopContext context) {
            _context = context;
        }

        public async Task<User?> FindByLogin(string login) {
            return await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
        }

        public async Task AddUser(User user) {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public bool EmailExists(string email) {
            return _context.Users.Any(user => user.Email == email);
        }

        public bool LoginExists(string login) {
            return _context.Users.Any(user => user.Login == login);
        }
    }
}