using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TRockApi.Handlers.Api;
using TRockApi.Repositories.Api;
using TRockApi.Response;

namespace TRockApi.Controllers {

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductOrderController {

        private readonly IProductOrderRepository _productOrderRepository;

        private readonly ICartRepository _cartRepository;

        private readonly IProductOrderHandling _productOrderHandling;

        public ProductOrderController(IProductOrderRepository productOrderRepository,
            IProductOrderHandling productOrderHandling, ICartRepository cartRepository) {
            _productOrderRepository = productOrderRepository;
            _productOrderHandling = productOrderHandling;
            _cartRepository = cartRepository;
        }

        [HttpGet]
        public IEnumerable<ProductOrderResponse> Index() {
            var productOrders = _productOrderRepository.All();

            return productOrders.Select(ProductOrderResponse.FromModel);
        }

        [HttpGet(":id")]
        public ActionResult<ProductOrderResponse> Get(int id) {
            var productOrder = _productOrderRepository.FindById(id);

            if (productOrder == null) {
                return new NotFoundResult();
            }

            return ProductOrderResponse.FromModel(productOrder);
        }

        [HttpPost("CreateFromCart")]
        public async Task<ActionResult> CreateOrderFromCart() {
            var cart = _cartRepository.FindCartByUser()
            var productOrderId = await _productOrderHandling.CreateProductOrderFromCart();

            return new OkResult();
        }
    }
}