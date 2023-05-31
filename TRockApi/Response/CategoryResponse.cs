using TRockApi.Repositories.Models;

namespace TRockApi.Response {
    public class CategoryResponse {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }


        public static CategoryResponse FromModel(Category model) {
            return new CategoryResponse {
                Id = model.Id,
                Name = model.Name,
                Caption = model.Caption
            };
        }
    }
}