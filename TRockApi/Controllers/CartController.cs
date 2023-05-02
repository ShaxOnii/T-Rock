using System;
using System.Threading.Tasks;
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
        public async Task<CartResponse> GetCart() {
            var user = GetAuthorizedUser();

            var cartForUser = _cartRepository.FindCartByUser(user.Id);

            if (cartForUser == null) {
                return new CartResponse();
            }

            return CartResponse.FromModel(cartForUser);
        }


        [HttpPost("add")]
        public async Task<ActionResult> AddCartItem(List<AddCartItemsRequest> cartItemsToAdd) {
            var user = GetAuthorizedUser();

            await _cartHandling.AddCartItems(user, cartItemsToAdd.Select(r => new CartChanges {
                ProductId = r.ProductId,
                Quantity = r.Quantity
            }));
            
            return new OkResult();
        }


        [HttpPost("remove")]
        public async Task<CartResponse> RemoveCartItem() {
            return new CartResponse();
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