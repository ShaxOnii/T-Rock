namespace TRockApi.Repositories.Models {
    public class CharacteristicModel {

        public int Id { get; set; }

        public string Name { get; set; }

        public string Caption { get; set; }

        public string Type { get; set; }

        public CharacteristicDetails? Details { get; set; }
    }
}