namespace TRockApi.Repositories.Models {
    public class Product {
        
        public int Id { get; set; }
        
        public string Name { get; set; }
                
        public string Caption { get; set; }
        
        public Category Category { get; set; }

        public float Price { get; set; }
        
        public string Description { set; get; }

    }
}