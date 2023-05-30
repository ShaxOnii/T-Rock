using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ImageLinkResponse {

        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Href { get; set; }

        public static ImageLinkResponse FromModel(string baseUri, Image model) {
            return new ImageLinkResponse {
                Id = model.Id,
                Name = model.Filename,
                Href = FormatLink(baseUri, model.Id)
            };
        }

        private static string FormatLink(string baseUri, int id) {
            return $"{baseUri}/api/Image/{id}";
        }
    }
}