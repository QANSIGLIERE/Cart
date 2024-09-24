var { Tax, Product, Modifier, Cart } = require('../index.js');

////////////////
// Blank Cart //
////////////////

test('Create a new blank cart', () => {
    // Create a new blank cart
    let newCart = new Cart([]);

    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.items.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);

    expect(Object.keys(newCart)).toEqual([
        'appliedTaxes',
        'taxIncluded',
        'items',
        'appliedDiscounts',
        'appliedServiceFees',
        'uuid',
        'createdDate',
        'updatedDate',
        'isClosed',
        'totalTaxAmount',
        'totalAmount',
        'finalTotalAmount',
        'currency',
    ]);
});

test('Create a new blank cart with the prevailing tax', () => {
    // Create a new Tax
    let newTax = new Tax('prevailing', 8.875);
    // Create a new blank cart
    let newCart = new Cart([newTax]);

    expect(newCart['appliedTaxes'][0]['name']).toMatch(/prevailing/);
    expect(newCart['appliedTaxes'][0]['taxRatePercentValue']).toEqual(8.875);
    expect(newCart['appliedTaxes'][0]['taxRate']).toEqual(0.08875);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.items.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.currency).toMatch(/\$/);
});

test('Create a new blank cart > Apply additional tax to the cart', () => {
    // Create a new blank cart
    let newCart = new Cart([]);
    // Create a new Tax
    let additionalTax = new Tax('Tabaco', 12.5);
    // Apply the tax to the cart
    newCart.applyTaxToCart(additionalTax);
    // Validate changes
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart['appliedTaxes'][0]['name']).toMatch(/Tabaco/);
    expect(newCart['appliedTaxes'][0]['taxRatePercentValue']).toEqual(12.5);
    expect(newCart['appliedTaxes'][0]['taxRate']).toEqual(0.125);
});

test('Create a new blank cart with the prevailing tax > remove taxes from the cart', () => {
    // Create a new Tax
    let newTax = new Tax('prevailing', 8.875);
    // Create a new blank cart
    let newCart = new Cart([newTax]);
    //  Remove taxes from cart
    newCart.removeTaxesFromCart();

    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.items.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create a new blank cart > Apply additional tax to the cart > Remove taxes from cart', () => {
    // Create a prevailing tax
    let newPrevailingTax = new Tax('prevailing', 8.875);
    // Create a new blank cart
    let newCart = new Cart([newPrevailingTax]);
    // Create a new Tax
    let additionalTax = new Tax('Tabaco', 12.5);
    // Apply the tax to the cart
    newCart.applyTaxToCart(additionalTax);
    // Remove taxes from cart
    newCart.removeTaxesFromCart();
    // Validate changes
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.items.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.isClosed).toBeFalsy();
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});
