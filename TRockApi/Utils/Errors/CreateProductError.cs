
namespace TRockApi.Utils.Errors {
    public class CreateProductError : Error {

        private readonly string _error;

        public CreateProductError(string error) {
            _error = error;
        }

        public override string Message() {
            return "Cannot create product: " + _error;
        }

        public override string Name() {
            return "CreateProductError";
        }
    }
}