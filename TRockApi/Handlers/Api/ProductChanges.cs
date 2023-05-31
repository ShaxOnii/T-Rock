using System.Collections.Generic;

namespace TRockApi.Handlers.Api {
    public class ProductChanges {
        public string? Caption { get; set; }
        
        public string? CategoryName { get; set; }
        
        public float? Price { get; set; }
        
        public string? Description { get; set; }

        public List<int> Images { get; set; } = new();
    }
}