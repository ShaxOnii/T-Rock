using TRockApi.Repositories.Models;

namespace TRockApi.Utils.Errors {
    public class MaximumImageSizeExceeded : Error {

        private string imageName;

        public MaximumImageSizeExceeded(string imageName) {
            this.imageName = imageName;
        }

        public override string Message() {
            var maxSize = Image.IMAGE_MAX_SIZE / 1000000;
            
            return $"The image '{imageName}' size has exceeded {maxSize}.";
        }

        public override string Name() {
            return "MaximumImageSizeExceeded";
        }
    }
}