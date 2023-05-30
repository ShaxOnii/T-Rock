using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Configuration;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories {
    public class ImageRepository : IImageRepository {
        private readonly ShopDbContext _dbContext;


        public ImageRepository(ShopDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Image>> GetALl() {
            return await _dbContext.Images.ToArrayAsync();
        }

        public async Task<Image?> GetById(int id) {
            return await _dbContext.Images.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<int> StoreImage(Image image) {
            await _dbContext.Images.AddAsync(image);
            await _dbContext.SaveChangesAsync();
            
            return image.Id;
        }

        public async Task DeleteImage(Image image) {
            _dbContext.Images.Remove(image);
            await  _dbContext.SaveChangesAsync();
        }
    }
}