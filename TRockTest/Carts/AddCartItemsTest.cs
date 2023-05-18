using System.Threading.Tasks;
using TRockApi.Handlers;
using TRockApi.Handlers.Api;
using TRockApi.Repositories;
using TRockApi.Repositories.Api;
using TRockApi.Repositories.Models;
using TRockTest;

namespace TRockTest.Carts;

public class AddCartItemsTest : MockedDatabaseTest {

    private ICartHandling _cartHandling = null!;

    private ICartRepository _cartRepository = null!;

    [SetUp]
    public void Setup() {
        SetupDbContext();
        SetupHandler();
    }

    [Test]
    public async Task AddSingleItemToNonExistingCart() {
        var testProduct = CreateMockedProduct(1);

        var addOneItem = new List<CartChanges>() {
            new() {
                ProductId = 1,
                QuantityChange = 1
            }
        };

        var userCartBeforeChange = GetCart();

        Assert.Null(userCartBeforeChange);

        await _cartHandling.AddCartItems(GetUser(), addOneItem);

        var userCartAfterChange = GetCart();

        Assert.NotNull(userCartAfterChange);
        Assert.That(userCartAfterChange.Items.Count, Is.EqualTo(1));

        var cartItem = userCartAfterChange.GetCartItemForProduct(testProduct);

        Assert.That(cartItem!.Quantity, Is.EqualTo(1));
        Assert.That(cartItem.Product, Is.EqualTo(testProduct));
    }

    [Test]
    public async Task AddSingleItemToExistingCart() {
        var testProduct = CreateMockedProduct(1);

        MockCart(new List<CartItem>() {
            new() {
                Product = testProduct,
                Quantity = 1
            }
        });

        var addOneItem = new List<CartChanges>() {
            new() {
                ProductId = 1,
                QuantityChange = 1
            }
        };

        var userCartBeforeChange = GetCart();

        Assert.NotNull(userCartBeforeChange);

        await _cartHandling.AddCartItems(GetUser(), addOneItem);

        var userCartAfterChange = GetCart();

        Assert.NotNull(userCartAfterChange);
        Assert.That(userCartAfterChange.Items.Count, Is.EqualTo(1));

        var cartItem = userCartAfterChange.GetCartItemForProduct(testProduct);

        Assert.That(cartItem!.Quantity, Is.EqualTo(2));
        Assert.That(cartItem.Product, Is.EqualTo(testProduct));
    }

    [Test]
    public async Task AddManyItemsToCart() {
        var user = GetUser();
        var testProduct1 = CreateMockedProduct(1);
        var testProduct2 = CreateMockedProduct(2);

        var addOneItem = new List<CartChanges>() {
            new() {
                ProductId = testProduct1.Id,
                QuantityChange = 1
            },
            new() {
                ProductId = testProduct2.Id,
                QuantityChange = 2
            }
        };

        await _cartHandling.AddCartItems(user, addOneItem);

        var userCartAfterChange = GetCart();

        var cartItem1 = userCartAfterChange.GetCartItemForProduct(testProduct1);
        Assert.NotNull(cartItem1);
        Assert.That(cartItem1!.Quantity, Is.EqualTo(1));
        Assert.That(cartItem1.Product, Is.EqualTo(testProduct1));

        var cartItem2 = userCartAfterChange.GetCartItemForProduct(testProduct2);
        Assert.NotNull(cartItem2);
        Assert.That(cartItem2!.Quantity, Is.EqualTo(2));
        Assert.That(cartItem2.Product, Is.EqualTo(testProduct2));
    }

    [Test]
    public async Task DoNotAddItemWithZeroQuantity() {
        var testProduct1 = CreateMockedProduct(1);

        var addOneItem = new List<CartChanges> {
            new() {
                ProductId = testProduct1.Id,
                QuantityChange = 0
            }
        };

        await _cartHandling.AddCartItems(GetUser(), addOneItem);

        var userCartAfterChange = GetCart();
        Assert.That(userCartAfterChange.Items, Is.Empty);
    }

    private void SetupHandler() {
        _cartRepository = new CartRepository(DbContext);
        _cartHandling = new CartHandling(
            _cartRepository,
            new ProductRepository(DbContext)
        );
    }
}