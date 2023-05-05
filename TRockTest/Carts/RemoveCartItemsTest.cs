using TRockApi.Handlers;
using TRockApi.Handlers.Api;
using TRockApi.Repositories;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;

namespace TRockTest.Carts {
    public class RemoveCartItemsTest : MockedDatabaseTest {

        private ICartHandling _cartHandling = null!;

        private ICartRepository _cartRepository = null!;

        [SetUp]
        public void Setup() {
            SetupDbContext();
            SetupHandler();
        }

        [Test]
        public async Task RemoveSingleProduct() {
            var testProduct = CreateMockedProduct(1);

            MockCart(new List<CartItem>() {
                new() {
                    Product = testProduct,
                    Quantity = 2
                }
            });

            var removeOneItem = new List<CartChanges>() {
                new() {
                    ProductId = 1,
                    Quantity = -1
                }
            };


            await _cartHandling.RemoveCartItems(GetUser(), removeOneItem);

            var userCartAfterChange = GetCart();

            Assert.NotNull(userCartAfterChange);
            Assert.That(userCartAfterChange.Items.Count, Is.EqualTo(1));

            var cartItem = userCartAfterChange.Items.First();

            Assert.That(cartItem.Quantity, Is.EqualTo(1));
            Assert.That(cartItem.Product, Is.EqualTo(testProduct));
        }

        [Test]
        public async Task RemoveLastProductShouldDeleteItem() {
            var testProduct = CreateMockedProduct(1);

            MockCart(new List<CartItem>() {
                new() {
                    Product = testProduct,
                    Quantity = 1
                }
            });

            var removeOneItem = new List<CartChanges>() {
                new() {
                    ProductId = 1,
                    Quantity = -1
                }
            };

            await _cartHandling.RemoveCartItems(GetUser(), removeOneItem);

            var userCartAfterChange = GetCart();

            Assert.NotNull(userCartAfterChange);
            Assert.That(userCartAfterChange.Items.Count, Is.EqualTo(0));
        }

        private void SetupHandler() {
            _cartRepository = new CartRepository(DbContext);
            _cartHandling = new CartHandling(
                _cartRepository,
                new ProductRepository(DbContext)
            );
        }
    }
}