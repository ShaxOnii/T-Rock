using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TRockApi.Handlers;
using TRockApi.Handlers.Api;
using TRockApi.Repositories;
using TRockApi.Repositories.Models;
using TRockApi.Utils.Errors;

namespace TRockTest.ProductOrders {
    public class ProductOrderCreationTest : MockedDatabaseTest {

        private IProductOrderHandling _productOrderHandling = null!;

        [SetUp]
        public void Setup() {
            SetupDbContext();
            SetupHandler();
        }

        [Test]
        public void DoNotCreateProductOrderForEmptyCart() {
            MockCart(new List<CartItem>());

            Assert.ThrowsAsync<CannotCreateProductOrderFromEmptyCartError>(async () => {
                await _productOrderHandling.CreateProductOrderFromCart(GetCart());
            });
            
            Assert.That(AllProductOrders(), Is.Empty);
        }

        private IEnumerable<ProductOrder> AllProductOrders() {
            return DbContext.ProductOrders.ToList();
        }

        [Test]
        public async Task CreateProductOrderForNonEmptyCart() {
            var testProductOne = CreateMockedProduct(1);
            var testProductTwo = CreateMockedProduct(2);

            MockCart(new List<CartItem> {
                new() {
                    Product = testProductOne,
                    Quantity = 1
                },
                new() {
                    Product = testProductTwo,
                    Quantity = 2
                }
            });

            var orderId = await _productOrderHandling.CreateProductOrderFromCart(GetCart());
            var createdOrder = GetProductOrder(orderId);

            Assert.That(createdOrder.Items, Is.Not.Empty);

            var itemOne = createdOrder.FindItemByProductId(1);
            Assert.That(itemOne, Is.Not.Null);
            Assert.That(itemOne!.Quantity, Is.EqualTo(1));
            Assert.That(itemOne.Price, Is.EqualTo(100));

            var itemTwo = createdOrder.FindItemByProductId(2);
            Assert.That(itemTwo, Is.Not.Null);
            Assert.That(itemTwo!.Quantity, Is.EqualTo(2));
            Assert.That(itemTwo.Price, Is.EqualTo(200));
        }

        private void SetupHandler() {
            _productOrderHandling = new ProductOrderHandling(
                new ProductOrderRepository(DbContext)
            );
        }

    }
}