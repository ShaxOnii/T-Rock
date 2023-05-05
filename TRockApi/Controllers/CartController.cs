using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Requests;
using TRockApi.Response;

namespace TRockApi.Controllers {

    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class CartController : ControllerBase {

        private readonly ICartRepository _cartRepository;
        private readonly IUserRepository _userRepository;

        private readonly ICartHandling _cartHandling;

        public CartController(ICartRepository cartRepository, IUserRepository userRepository,
            ICartHandling cartHandling) {
            _cartRepository = cartRepository;
            _userRepository = userRepository;
            _cartHandling = cartHandling;
        }


        [HttpGet]
        public Task<CartResponse> GetCart() {
            var user = GetAuthorizedUser();

            var cartForUser = _cartRepository.FindCartByUser(user.Id);

            if (cartForUser == null) {
                return Task.FromResult(new CartResponse());
            }

            return Task.FromResult(CartResponse.FromModel(cartForUser));
        }


        [HttpPost("add")]
        public async Task<ActionResult> AddCartItem(List<AddCartItemsRequest> request) {
            var user = GetAuthorizedUser();

            await _cartHandling.AddCartItems(user, request.Select(r => new CartChanges {
                ProductId = r.ProductId,
                QuantityChange = r.Count
            }));

            return new OkResult();
        }


        [HttpPost("remove")]
        public Task<ActionResult> RemoveCartItem(List<RemoveCartItemsRequest> request) {
            var user = GetAuthorizedUser();

            _cartHandling.RemoveCartItems(user, request.Select(r => new CartChanges {
                ProductId = r.ProductId,
                QuantityChange = -r.Count
            }));

            return Task.FromResult<ActionResult>(new OkResult());
        }


        private User GetAuthorizedUser() {
            var username = User.Identity!.Name;

            if (username == null) {
                throw new Exception("User identity not exits.");
            }

            var authorizedUser = _userRepository.FindByLogin(username).Result;

            if (authorizedUser == null) {
                throw new Exception($"User with name '{username}' not found.");
            }

            return authorizedUser;
        }
    }
}