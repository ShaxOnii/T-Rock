using System.Collections.Generic;
using System.Threading.Tasks;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Api {
    public interface IImageRepository {

        Task<IEnumerable<Image>> GetALl();
        
        Task<Image?> GetById(int id);
        
        Task<int> StoreImage(Image image);
        
        Task DeleteImage(Image image);
        
    }
}