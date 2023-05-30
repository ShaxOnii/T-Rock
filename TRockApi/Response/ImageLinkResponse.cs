using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class ImageLinkResponse {
        public string Href { get; set; }

        public static ImageLinkResponse FromModel(string baseUri, Image model) {
            return new ImageLinkResponse {
                Href = FormatLink(baseUri, model.Id)
            };
        }

        private static string FormatLink(string baseUri, int id) {
            return $"{baseUri}/api/Image/{id}";
        }
    }
}