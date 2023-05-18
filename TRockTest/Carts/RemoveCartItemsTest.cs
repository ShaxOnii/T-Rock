using System.Linq;
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
        public void RemoveSingleProduct() {
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
                    QuantityChange = -1
                }
            };


            _cartHandling.RemoveCartItems(GetUser(), removeOneItem);

            var userCartAfterChange = GetCart();

            Assert.NotNull(userCartAfterChange);
            Assert.That(userCartAfterChange.Items.Count, Is.EqualTo(1));

            var cartItem = userCartAfterChange.Items.First();

            Assert.That(cartItem.Quantity, Is.EqualTo(1));
            Assert.That(cartItem.Product, Is.EqualTo(testProduct));
        }

        [Test]
        public void RemoveLastProductShouldDeleteItem() {
            var testProduct = CreateMockedProduct(1);

            MockCart(new List<CartItem> {
                new() {
                    Product = testProduct,
                    Quantity = 1
                }
            });

            var removeOneItem = new List<CartChanges>() {
                new() {
                    ProductId = 1,
                    QuantityChange = -1
                }
            };

            var cartItemId = GetCart().GetCartItemForProduct(testProduct)!.Id;

            _cartHandling.RemoveCartItems(GetUser(), removeOneItem);

            var userCartAfterChange = GetCart();

            Assert.NotNull(userCartAfterChange);
            Assert.That(userCartAfterChange.Items.Count, Is.EqualTo(0));

            var cartItemFromDatabase = DbContext.CartItems.FirstOrDefault(i => i.Id == cartItemId);
            Assert.Null(cartItemFromDatabase);
        }

        [Test]
        public void RamoveManyProductsFromCart() {
            var testProduct1 = CreateMockedProduct(1);
            var testProduct2 = CreateMockedProduct(2);
            var testProduct3 = CreateMockedProduct(3);

            MockCart(new List<CartItem> {
                new() {
                    Product = testProduct1,
                    Quantity = 1
                },
                new() {
                    Product = testProduct2,
                    Quantity = 2
                },
                new() {
                    Product = testProduct3,
                    Quantity = 3
                }
            });

            var removeOneItem = new List<CartChanges> {
                new() {
                    ProductId = 2,
                    QuantityChange = -2
                },
                new() {
                    ProductId = 3,
                    QuantityChange = -2
                }
            };
            
            _cartHandling.RemoveCartItems(GetUser(), removeOneItem);

            var userCartAfterChange = GetCart();

            Assert.NotNull(userCartAfterChange);
            Assert.That(userCartAfterChange.Items.Count, Is.EqualTo(2));

            var itemForProductOne = userCartAfterChange.GetCartItemForProduct(testProduct1);
            Assert.That(itemForProductOne!.Quantity, Is.EqualTo(1));
            
            
            var itemForProductTwo = userCartAfterChange.GetCartItemForProduct(testProduct2);
            Assert.Null(itemForProductTwo);
            
            var itemForProductThree = userCartAfterChange.GetCartItemForProduct(testProduct3);
            Assert.That(itemForProductThree!.Quantity, Is.EqualTo(1));
            
        }
        
        [Test]
        public void DoNotAddItemsWhenQuantityIsGReaterThanZero() {
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
                    QuantityChange = 1
                }
            };


            _cartHandling.RemoveCartItems(GetUser(), removeOneItem);

            var userCartAfterChange = GetCart();
            var itemForProduct = userCartAfterChange.GetCartItemForProduct(testProduct);
            
            Assert.That(itemForProduct!.Quantity, Is.EqualTo(1));
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