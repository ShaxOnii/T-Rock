
namespace TRockApi.Handlers.Api {
    public interface IProductOrder<out TModel> {

        TModel Model();

        IState State();

    }
}