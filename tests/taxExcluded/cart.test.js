var { Tax, Product, Modifier, Discount, ServiceFee, Cart } = require('../../index.js');

test('Create an empty Cart > Add an item', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);

    // Item Level
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalItemModifiersPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);

    // Cart Level
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3);
});
