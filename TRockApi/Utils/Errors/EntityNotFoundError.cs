namespace TRockApi.Utils.Errors {
    public class EntityNotFoundError : Error {

        private readonly int _entityId;
        private readonly string _entityType;

        public EntityNotFoundError(int entityId, string entityType) {
            _entityId = entityId;
            _entityType = entityType;
        }

        public override string Message() {
            return $"{_entityType} with id '{_entityId}' not found.";
        }

        public override string Name() {
            return "EntityNotFoundError";
        }
    }
}