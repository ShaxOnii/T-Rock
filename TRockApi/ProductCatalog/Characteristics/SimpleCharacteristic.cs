using TRockApi.ProductCatalog.Api;

namespace TRockApi.ProductCatalog.Characteristics {
    public class SimpleCharacteristic : ICharacteristic<string> {

        public int GetId() {
            throw new System.NotImplementedException();
        }

        public string Name() {
            throw new System.NotImplementedException();
        }

        public string Caption() {
            throw new System.NotImplementedException();
        }

        public string Type() {
            return "SimpleCharacteristic";
        }

        public ValueType GetValueType() {
            return ValueType.String;
        }

        public bool ValueIsValid(string value) {
            return true;
        }
    }
}