namespace TRockApi.Utils.Errors {
    public class CategoryAlreadyExistError : Error {

        private readonly string _categoryName;

        public CategoryAlreadyExistError(string categoryName) {
            _categoryName = categoryName;
        }

        public override string Message() {
            return $"Category with name: '{_categoryName}' exists.";
        }

        public override string Name() {
            return "CategoryAlreadyExistError";
        }
    }
}