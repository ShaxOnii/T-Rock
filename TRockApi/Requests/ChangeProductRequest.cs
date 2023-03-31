namespace TRockApi.Requests {
    public class ChangeProductRequest {
        
        public string Name { get; set; }
                
        public string Caption { get; set; }
        
        public string Category { get; set; }

        public float Price { get; set; }
        
        public string Description { set; get; }

    }
}