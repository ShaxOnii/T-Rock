using System.Threading.Tasks;
using TRockApi.Models;

namespace TRockApi.Repositories {
    public interface IUserRepository {

        Task<User?> FindByLogin(string login);

        Task AddUser(User user);

        public bool EmailExists(string email);

        public bool LoginExists(string login);
    }
}