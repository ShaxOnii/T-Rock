using TRockApi.Handlers;
using TRockApi.Repositories;
using TRockApi.Repositories.Models;

namespace TRockTest.ProductOrders {
    public class ProductOrderCreationTest : MockedDatabaseTest {

        private ProductOrderHandling _productOrderHandling = null!;

        [SetUp]
        public void Setup() {
            SetupDbContext();
            SetupHandler();
        }

        [Test]
        public void DoNotCreateProductOrderForEmptyCart() {

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
            Assert.That(itemOne!.Qunatity, Is.EqualTo(1));
            Assert.That(itemOne.Price, Is.EqualTo(100));

            var itemTwo = createdOrder.FindItemByProductId(2);
            Assert.That(itemTwo, Is.Not.Null);
            Assert.That(itemTwo!.Qunatity, Is.EqualTo(2));
            Assert.That(itemTwo.Price, Is.EqualTo(200));
        }
        
        private void SetupHandler() {
            _productOrderHandling = new ProductOrderHandling(
                new ProductOrderRepository(DbContext)
            );
        }

    }
}