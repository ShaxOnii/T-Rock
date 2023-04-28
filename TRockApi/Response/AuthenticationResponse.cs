using System.Collections.Generic;

namespace TRockApi.Response {

    public class AuthenticationResponse {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        
        public IEnumerable<string> Roles { get; set; }
    }
}