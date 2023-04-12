using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Requests;
using TRockApi.Response;
using TRockApi.Security;

namespace TRockApi.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService) {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> LoginAsync(AuthenticationRequest request) {
            var result = await _authService.AuthAsync(request.Login, request.Password);
            
            //TODO: przerobic to na jakiego normalnego jsona
            if (result.IsFailure()) {
                return BadRequest("Bad credentials.");
            }

            return new AuthenticationResponse {
                Id = result.User.Id,
                Username = result.User.Login,
                Token = result.Token
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<IRegistrationResponse>> RegisterAsync(RegistrationRequest request) {
            var result = await _authService.RegisterAsync(request);

            if (result.IsFailure()) {
                var errorMessages = result.Errors.Select(e => e.Message());
                return new RegistrationFailureResponse(errorMessages);
            }

            return new RegistrationSuccessResponse {
                Id = result.RegisteredUser.Id,
                Username = result.RegisteredUser.Login,
                Email = result.RegisteredUser.Email
            };
        }

    }
}