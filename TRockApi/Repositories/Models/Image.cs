using System.ComponentModel.DataAnnotations.Schema;

namespace TRockApi.Repositories.Models {
    public class Image {
        public int Id { get; set; }
        
        public string Filename { get; set; }
        
        public string Extension { get; set; }
        
        public string Content { get; set; }
        
        [ForeignKey("ProductId")]
        public Product Product { get; set; }

        public static int IMAGE_MAX_SIZE = 10000000; // 10mb
    }
}