namespace TRockApi.Security.Errors {
    public class EmailIsUsedError : ILogicError {

        private readonly string _email;

        public EmailIsUsedError(string email) {
            _email = email;
        }
        
        public string Message() {
            return "User with email " + _email + " already exists";
        }
    }
}