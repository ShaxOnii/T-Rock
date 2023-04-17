namespace TRockApi.Utils.Errors {
    public class EntityValidationError : Error {

        private string _field;

        private string _message;

        private int _entityId;

        public EntityValidationError(int entityId, string field, string message) {
            _field = field;
            _message = message;
            _entityId = entityId;
        }

        public override string Message() {
            return _message;
        }

        public override string Name() {
            return "EntityValidationError";
        }
    }
}