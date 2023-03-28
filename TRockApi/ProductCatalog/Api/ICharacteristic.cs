namespace TRockApi.ProductCatalog.Api {
    public interface ICharacteristic<in T> {
        int GetId();
        
        string Name();

        string Type();
        
        string Caption();

        ValueType GetValueType();
        
        bool ValueIsValid(T value);
    }
}