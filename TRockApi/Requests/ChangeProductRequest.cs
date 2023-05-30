using System.Collections.Generic;

namespace TRockApi.Requests {
    public class ChangeProductRequest {
        
        public string? Caption { get; set; }
        
        public string? Category { get; set; }

        public float? Price { get; set; }
        
        public string? Description { set; get; }
        
        public IEnumerable<int> ProductImages { get; set; }
    }
}