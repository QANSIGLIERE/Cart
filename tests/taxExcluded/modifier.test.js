var { Tax, Product, Modifier, Discount, ServiceFee, Cart } = require('../../index.js');

test('Create an empty Cart > Add an item > Apply modifiers to the item', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 1);
    // Create a new modifier
    let newModifier = new Modifier(0.99, 'Sugar');
    // Apply the modifier to the product
    newCart.applyModifierToItem(0, newModifier, 3);

    // Item Level
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(1);
    expect(newCart.appliedProducts[0]['appliedModifiers'][0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);

    // Cart Level
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 + 0.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(5.99 + 0.99 * 3);
});

test('Create an empty Cart > Add an item > Add some modifiers > Apply a percent type tax to the item > Apply a percent type tax to the cart', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
    // Create a new modifier
    let newModifier = new Modifier(0.99, 'Sugar');
    // Apply the modifier to the product
    newCart.applyModifierToItem(0, newModifier, 3);
    // Create a new percent type tax
    let newPercentTax = new Tax('Regular', 'percent', 8.875);
    // Apply the tax to the item
    newCart.applyTaxToItem(0, newPercentTax);
    // Create a new percent type tax
    let newCartPercentTax = new Tax('Local', 'percent', 1.25);
    // Apply the percent tax to the cart
    newCart.applyTaxToCart(newCartPercentTax);

    // Item Level
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(3 * 3 * 0.99);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(
        (5.99 * 3 + 3 * 3 * 0.99) * (0.08875 + 0.0125),
    );
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(1);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual((5.99 * 3 + 3 * 3 * 0.99) * (0.08875 + 0.0125));
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3 + 3 * 3 * 0.99);
    expect(newCart.totalTaxAmount).toEqual((5.99 * 3 + 3 * 3 * 0.99) * (0.08875 + 0.0125));
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3 + 3 * 3 * 0.99 + (5.99 * 3 + 3 * 3 * 0.99) * (0.08875 + 0.0125));
});
