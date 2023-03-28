using TRockApi.Repositories.Api;

namespace TRockApi.Repositories {
    public class CharacteristicRepository : ICharacteristicRepository {
        
        private readonly ShopContext _context;

        public CharacteristicRepository(ShopContext context) {
            _context = context;
        }

        
    }
}