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
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3);
});

test('Create an empty Cart > Add an item > Apply an amount type tax to the item', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
    // Create a new amount type tax
    let newAmountTax = new Tax('Tobaco', 'amount', 1.01);
    // Apply the tax to the item
    newCart.applyTaxToItem(0, newAmountTax);

    // Item Level
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(1.01 * 3);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(1);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(1.01 * 3);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(1.01 * 3);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3 + 1.01 * 3);
});

test('Create an empty Cart > Apply an amount type tax to the cart', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new amount type tax
    let newAmountTax = new Tax('Tobaco', 'amount', 1.01);
    // Apply the tax to the cart
    newCart.applyTaxToCart(newAmountTax);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create an empty Cart > Add an item > Apply an amount type tax to the cart', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
    // Create a new amount type tax
    let newAmountTax = new Tax('Tobaco', 'amount', 1.01);
    // Apply the tax to the cart
    newCart.applyTaxToCart(newAmountTax);

    // Item Level
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(0);

    // Cart Level
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(1.01);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(1.01);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3 + 1.01);
});

test('Create an empty Cart > Add an item > Apply an amount type tax to the item > Remove the tax from the item', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
    // Create a new amount type tax
    let newAmountTax = new Tax('Tobaco', 'amount', 1.01);
    // Apply the tax to the item
    newCart.applyTaxToItem(0, newAmountTax);
    // Remove the tax from the item
    newCart.removeTaxesFromItem(0);

    // Item Level
    expect(newCart.appliedProducts[0]['isUntaxed']).toBeTruthy();
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(0);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3);
});

test('Create an empty Cart > Add an item > Apply a percent type tax to the item', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
    // Create a new percent type tax
    let newPercentTax = new Tax('Regular', 'percent', 8.875);
    // Apply the tax to the item
    newCart.applyTaxToItem(0, newPercentTax);

    // Item Level
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(5.99 * 3 * 0.08875);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(1);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(5.99 * 3 * 0.08875);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(5.99 * 3 * 0.08875);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3 + 5.99 * 3 * 0.08875);
});

test('Create an empty Cart > Apply a percent type tax to the cart', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new percent type tax
    let newPercentTax = new Tax('Regular', 'percent', 8.895);
    // Apply the tax to the cart
    newCart.applyTaxToCart(newPercentTax);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create an empty Cart > Add an item > Apply a percent type tax to the cart', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
    // Create a new percent type tax
    let newPercentTax = new Tax('Regular', 'percent', 8.875);
    // Apply the tax to the cart
    newCart.applyTaxToCart(newPercentTax);

    // Item Level
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(5.99 * 3 * 0.08875);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(0);

    // Cart Level
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(5.99 * 3 * 0.08875);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(5.99 * 3 * 0.08875);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3 + 5.99 * 3 * 0.08875);
});

test('Create an empty Cart > Add an item > Apply a percent type tax to the item > Remove the tax from the item', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
    // Create a new percent type tax
    let newPercentTax = new Tax('Regular', 'percent', 8.875);
    // Apply the tax to the item
    newCart.applyTaxToItem(0, newPercentTax);
    // Remove the tax from the item
    newCart.removeTaxesFromItem(0);

    // Item Level
    expect(newCart.appliedProducts[0]['isUntaxed']).toBeTruthy();
    expect(newCart.appliedProducts[0]['name']).toMatch(/Brownie/);
    expect(newCart.appliedProducts[0]['price']).toEqual(5.99);
    expect(newCart.appliedProducts[0]['quantity']).toEqual(3);
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(0);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3);
});

test('Create an empty Cart > Add an item > Apply a percent type tax to the item > Apply a percent type tax to the cart', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 3);
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
    expect(newCart.appliedProducts[0]['totalValues']['totalItemModifierPrice']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['totalPrice']).toEqual(5.99 * 3);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxIncludedAmount']).toEqual(0);
    expect(newCart.appliedProducts[0]['totalValues']['itemTaxExcludedAmount']).toEqual(5.99 * 3 * (0.08875 + 0.0125));
    expect(newCart.appliedProducts[0]['sort']).toEqual(0);
    expect(newCart.appliedProducts[0]['appliedTaxes'].length).toEqual(1);

    // Cart Level
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(5.99 * 3 * (0.08875 + 0.0125));
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(5.99 * 3);
    expect(newCart.totalTaxAmount).toEqual(5.99 * 3 * (0.08875 + 0.0125));
    expect(newCart.finalTotalAmount).toEqual(5.99 * 3 + 5.99 * 3 * (0.08875 + 0.0125));
});
