using System.Collections.Generic;

namespace TRockApi.Repositories.Models {
    public class Role {

        public int Id { get; set; }

        public string Name { get; set; }
        
        public IEnumerable<User> Users { get; set; }
    }
}