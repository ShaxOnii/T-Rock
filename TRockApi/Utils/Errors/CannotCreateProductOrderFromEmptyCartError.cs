namespace TRockApi.Utils.Errors {
    public class CannotCreateProductOrderFromEmptyCartError : Error {

        public override string Message() {
            return "Cannot create product order from empty cart.";
        }

        public override string Name() {
            return "CannotCreateProductOrderFromEmptyCartError";
        }
    }
}