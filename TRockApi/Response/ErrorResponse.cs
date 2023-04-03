using Newtonsoft.Json;

namespace TRockApi.Response {
    public class ErrorResponse {
        public int StatusCode { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        
        public override string ToString() {
            return JsonConvert.SerializeObject(this, new JsonSerializerSettings {
                NullValueHandling = NullValueHandling.Ignore
            });
        }
    }
}