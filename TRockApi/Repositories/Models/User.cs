using System;
using System.Collections.Generic;
using System.Linq;

namespace TRockApi.Repositories.Models {
    public class User {
        public int Id { get; set; }
        
        public String Login { get; set; }

        public String Email { get; set; }

        public String Password { get; set; }
        
        public IEnumerable<Role> Roles { get; set; }

        public bool hasRole(string role) {
            return Roles.Any(r => r.Name == role);
        }
    }
}