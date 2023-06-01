using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockApi.Requests;
using TRockApi.Response;
using TRockApi.Security;

namespace TRockApi.Controllers {

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductOrderController : AbstractController {

        private readonly IProductOrderRepository _productOrderRepository;

        private readonly ICartRepository _cartRepository;

        private readonly IProductOrderHandling _productOrderHandling;

        public ProductOrderController(
            IProductOrderRepository productOrderRepository,
            IProductOrderHandling productOrderHandling,
            ICartRepository cartRepository,
            IUserRepository userRepository
        ) : base(userRepository) {
            _productOrderRepository = productOrderRepository;
            _productOrderHandling = productOrderHandling;
            _cartRepository = cartRepository;
        }

        [HttpGet]
        public IEnumerable<ProductOrderResponse> Index([FromQuery(Name = "all")] bool all = false) {
            return FindOrdersForAuthorizedUser(all).Select(ProductOrderResponse.FromModel);
        }

        private IEnumerable<ProductOrder> FindOrdersForAuthorizedUser(bool returnAll) {
            var user = GetAuthorizedUser();

            if (returnAll && user.hasRole(Roles.ADMIN_ROLE)) {
                return _productOrderRepository.All();
            }

            return _productOrderRepository.AllByUserId(user.Id);
        }

        [HttpGet("{id}")]
        public ActionResult<ProductOrderResponse> Get(int id) {
            var productOrder = _productOrderRepository.FindById(id);

            if (productOrder == null) {
                return new NotFoundResult();
            }

            return ProductOrderResponse.FromModel(productOrder);
        }

        [HttpPost("CreateFromCart")]
        public async Task<ActionResult<CreateEntityResponse>> CreateOrderFromCart() {
            var user = GetAuthorizedUser();
            var cart = _cartRepository.FindCartByUser(user.Id);

            if (cart == null) {
                return new BadRequestResult();
            }
            
            var productOrderId = await _productOrderHandling.CreateProductOrderFromCart(cart);
            
            return new CreateEntityResponse(productOrderId);
        }
        
        
        [HttpPost("{id}/changeState")]
        public ActionResult ChangeState(int id, ChangeProductOrderStateRequest request) {
            _productOrderHandling.ChangeProductOrderState(id, request.state);

            return new OkObjectResult(new {message = "ok"});
        }
    }
}