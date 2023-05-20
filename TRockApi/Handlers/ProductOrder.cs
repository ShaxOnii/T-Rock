using TRockApi.Handlers.Api;
using ProductOrderModel = TRockApi.Repositories.Models.ProductOrder;

namespace TRockApi.Handlers {
    public class ProductOrder : IProductOrder<ProductOrderModel> {

        private readonly ProductOrderModel _productOrder;

        public ProductOrder(ProductOrderModel productOrder) {
            _productOrder = productOrder;
        }

        public ProductOrderModel Model() => _productOrder;

        public IState State() {
            return ProductOrderStates.FromString(Model().State);
        }

        public void ChangeState(IState state) {
            var stateCtx = StateContext();   
            
            stateCtx.ChangeState(state);

            Model().State = stateCtx.CurrentState.Name();
        }

        private EntityStateContext StateContext() {
            var stateContext = new EntityStateContext(State());

            stateContext.AddTransition(
                new StateTransition(new WaitingForPayment(), new DuringFulfillment())
            );
            
            stateContext.AddTransition(
                new StateTransition(new DuringFulfillment(), new Sent())
            );
            
            stateContext.AddTransition(
                new StateTransition(new Sent(), new Done())
            );
            
            return stateContext;
        }
    }
}