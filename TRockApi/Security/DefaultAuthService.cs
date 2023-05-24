using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Requests;
using TRockApi.Security.Errors;


namespace TRockApi.Security {
    public class DefaultAuthService : IAuthService {

        private const int TokenExpirationTime = 30;

        private readonly IUserRepository _userRepository;

        public DefaultAuthService(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        public async Task<RegistrationResult> RegisterAsync(RegistrationRequest request) {
            return await Task.Run(() => Register(request));
        }

        private RegistrationResult Register(RegistrationRequest request) {
            var clientRole = _userRepository.GetRoleByName(Roles.CLIENT_ROLE);
            
            var user = new User {
                Login = request.Login,
                Email = request.Email,
                Password = request.Password,
                Roles = new List<Role>{clientRole}
            };

            var result = new RegistrationResult();

            result.Validate(() => !_userRepository.EmailExists(user.Email), new EmailIsUsedError(user.Email));
            result.Validate(() => !_userRepository.LoginExists(user.Login), new LoginIsUsedError(user.Login));

            if (result.IsSuccess()) {
                _userRepository.AddUser(user).Wait();
                result.RegisteredUser = _userRepository.FindByLogin(user.Login).Result;
            }

            return result;
        }

        public async Task<AuthenticationResult> AuthAsync(string login, string password) {
            var user = await _userRepository.FindByLogin(login);

            if (user != null && user.Password == password) {
                var token = await Task.Run(() => CreateToken(user));
                return AuthenticationResult.Success(token, user);
            }

            return AuthenticationResult.Failure();
        }

        private string CreateToken(User user) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var expirationTime = DateTime.UtcNow.AddMinutes(TokenExpirationTime);

            var token = new JwtSecurityToken(
                "TRockAPI",
                "TRockAPI",
                CreateClaims(user),
                expires: expirationTime,
                signingCredentials: CreateCredentials()
            );

            return tokenHandler.WriteToken(token);
        }

        private IEnumerable<Claim> CreateClaims(User user) {
            var claims = new List<Claim> {
                new(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.Login),
                new(ClaimTypes.Email, user.Email)
            };

            return claims;
        }

        private SigningCredentials CreateCredentials() {
            return new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes("#TRockSecretKey!")),
                SecurityAlgorithms.HmacSha256
            );
        }
    }
}