using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Requests;
using TRockApi.Response;

namespace TRockApi.Controllers {

    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class CartAbstractController : AbstractController {

        private readonly ICartRepository _cartRepository;

        private readonly ICartHandling _cartHandling;

        public CartAbstractController(ICartRepository cartRepository, IUserRepository userRepository,
            ICartHandling cartHandling) : base(userRepository) {
            _cartRepository = cartRepository;
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
        
    }
}