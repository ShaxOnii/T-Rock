using System;
using System.Collections.Generic;

namespace TRockApi.Models {
    public class WeedModel {

        public String Species { get; set; }
        public int Price { get; set; }

        public static List<WeedModel> all() {
            return new List<WeedModel> {
                new() {Species = "sativa", Price = 1},
                new() {Species = "indica", Price = 2},
                new() {Species = "ruderalis", Price = 3}
            };
        }
    }
}