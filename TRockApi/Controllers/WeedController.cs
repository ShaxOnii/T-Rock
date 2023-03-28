using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Repositories.Models;
using TRockApi.Requests;

namespace TRockApi.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class WeedController : ControllerBase {

        [HttpGet]
        public IEnumerable<WeedResponse> Index() {
            return WeedModel.all().Select(weed => new WeedResponse {Species = weed.Species});
        }

        [HttpGet("details"), Authorize]
        public IEnumerable<WeedDetailsResponse> GetWeedDetails() {
            return WeedModel.all().Select(weed => new WeedDetailsResponse {
                Species = weed.Species,
                Price = weed.Price
            });
        }
    }
}