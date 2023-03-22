using System.Threading.Tasks;
using TRockApi.Requests;


namespace TRockApi.Security {
    public interface IAuthService {

        Task<RegistrationResult> RegisterAsync(RegistrationRequest request);

        Task<AuthenticationResult> AuthAsync(string login, string password);
    }
}