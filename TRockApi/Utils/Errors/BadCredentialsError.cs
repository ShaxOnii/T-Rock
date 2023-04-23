namespace TRockApi.Utils.Errors {
    public class BadCredentialsError: Error {

        public override string Message() {
            return "Bad credentials.";
        }

        public override string Name() {
            return "BadCredentialsError";
        }
    }
}