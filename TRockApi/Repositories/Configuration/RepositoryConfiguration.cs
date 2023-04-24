using Microsoft.Extensions.DependencyInjection;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public static class RepositoryConfiguration {
        public static void Register(IServiceCollection services) {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
        }
    }
}