using System;

namespace TRockApi.Models {
    public class User {
        public int Id { get; set; }
        
        public String Login { get; set; }

        public String Email { get; set; }

        public String Password { get; set; }
        
        public Role Role { get; set; }
    }
}