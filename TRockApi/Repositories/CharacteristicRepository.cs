using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;

namespace TRockApi.Repositories {
    public class CharacteristicRepository : ICharacteristicRepository {
        
        private readonly ShopDbContext _dbContext;

        public CharacteristicRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        
    }
}