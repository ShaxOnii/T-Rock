using System.Threading.Tasks;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface IUserRepository {

        Task<User?> FindByLogin(string login);

        Task AddUser(User user);

        public bool EmailExists(string email);

        public bool LoginExists(string login);

        public Role GetRoleByName(string name);
    }
}