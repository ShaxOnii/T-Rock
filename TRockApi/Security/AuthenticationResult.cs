using Microsoft.IdentityModel.Tokens;
using TRockApi.Models;

namespace TRockApi.Security {
    public class AuthenticationResult {

        public string? Token { get; }

        public User? User { get; }

        public static AuthenticationResult Success(string token, User user) {
            return new AuthenticationResult(token, user);
        }

        public static AuthenticationResult Failure() {
            return new AuthenticationResult(null, null);
        }
        
        public bool IsFailure() {
            return Token.IsNullOrEmpty() || User == null;
        }

        private AuthenticationResult(string? token, User? user) {
            Token = token;
            User = user;
        }
    }
}