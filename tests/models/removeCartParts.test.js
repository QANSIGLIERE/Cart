var { Tax, Product, Modifier, Discount, ServiceFee, Cart } = require('../../index.js');

test('Create an empty Cart', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);

    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.isUntaxed).toBeFalsy();
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);

    expect(Object.keys(newCart)).toEqual([
        'appliedTaxes',
        'taxIncluded',
        'appliedProducts',
        'appliedDiscounts',
        'appliedServiceFees',
        'isClosed',
        'currency',
        'createdDate',
        'updatedDate',
        'uuid',
        'isUntaxed',
        'taxIncludedAmount',
        'taxExcludedAmount',
        'totalDiscountsAmount',
        'totalServiceFeesAmount',
        'totalAmount',
        'totalTaxAmount',
        'finalTotalAmount',
    ]);
});

test('Create an empty Cart > Add an item > Remove all items', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new item
    let newItem = new Product(5.99, 'Brownie');
    // Add the item to the cart
    newCart.applyProductToCart(newItem, 1);
    // Remove the item
    newCart.removeProductsFromCart();

    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create an empty Cart > Add a tax > Remove all taxes', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new tax
    let newTax = new Tax('prevailing', 'percent', 8.895);
    // Add the tax to the cart
    newCart.applyTaxToCart(newTax);
    // Remove the tax
    newCart.removeTaxesFromCart();

    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create an empty Cart > Add a discount > Remove all discounts', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new discount
    let newDiscount = new Discount('5%', 'percent', 5);
    // Add the discount to the cart
    newCart.applyDiscountToCart(newDiscount);
    // Remove the discount
    newCart.removeDiscountsFromCart();

    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create an empty Cart > Add a service fee > Remove all service fees', () => {
    // Create a new empty cart
    let newCart = new Cart([], false, [], [], []);
    // Create a new service fee
    let newServiceFee = new ServiceFee('5%', 'percent', 5);
    // Add the service fee to the cart
    newCart.applyServiceFeeToCart(newServiceFee);
    // Remove the service fees
    newCart.removeServiceFeesFromCart();

    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.taxIncludedAmount).toEqual(0);
    expect(newCart.taxExcludedAmount).toEqual(0);
    expect(newCart.totalDiscountsAmount).toEqual(0);
    expect(newCart.totalServiceFeesAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});
