using Microsoft.Extensions.DependencyInjection;
using TRockApi.Handlers.Api;

namespace TRockApi.Handlers.Configuration {
    public static class HandlersConfiguration {
        public static void Register(IServiceCollection services) {
            services.AddScoped<IProductHandling, ProductHandling>();
        }
    }
}