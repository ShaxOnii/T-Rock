namespace TRockApi.Security.Errors {
    public class LoginIsUsedError : ILogicError {

        private readonly string _username;

        public LoginIsUsedError(string username) {
            _username = username;
        }
        
        public string Message() {
            return "User with name " + _username + " already exists";
        }
    }
}