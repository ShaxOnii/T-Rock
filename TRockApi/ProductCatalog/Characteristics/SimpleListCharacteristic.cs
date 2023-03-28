using System;
using System.Collections.Generic;
using System.Linq;
using TRockApi.ProductCatalog.Api;
using ValueType = TRockApi.ProductCatalog.Api.ValueType;

namespace TRockApi.ProductCatalog.Characteristics {
    public class SimpleListCharacteristic : ICharacteristic<String> {

        private HashSet<String> _possibleValues;


        public SimpleListCharacteristic(IEnumerable<string> possibleValues) {
            _possibleValues = possibleValues.ToHashSet();
        }

        public int GetId() {
            throw new NotImplementedException();
        }

        public string Name() {
            throw new NotImplementedException();
        }

        public string Type() {
            throw new NotImplementedException();
        }

        public string Caption() {
            throw new NotImplementedException();
        }

        public ValueType GetValueType() {
            return ValueType.String;
        }

        public bool ValueIsValid(string value) {
           return _possibleValues.Contains(value);
        }
        
    }
}