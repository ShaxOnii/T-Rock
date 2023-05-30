using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ImageLinkResponse {

        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Href { get; set; }

        public static ImageLinkResponse FromModel(Image model) {
            return new ImageLinkResponse {
                Id = model.Id,
                Name = model.Filename,
                Href = FormatLink(model.Id)
            };
        }

        private static string FormatLink(int id) {
            return $"api/Image/{id}";
        }
    }
}