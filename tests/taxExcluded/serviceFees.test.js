var { Tax, Product, Modifier, Cart, Discount, ServiceFee } = require('../../index.js');

/////////////////
// Order Level //
/////////////////
test('Create a new cart > Apply a new service fee', () => {
    // Create a prevailing tax
    let newPrevailingTax = new Tax('prevailing', 8.875);
    // Create a new blank cart
    let newCart = new Cart([newPrevailingTax]);
    // Create a new service fee
    let orderServiceFee = new ServiceFee('5%', 'percent', 5);
    // Apply the service fee to the Cart
    newCart.applyServiceFeeToCart(orderServiceFee);

    // Validate changes
    expect(newCart.appliedServiceFees.length).toEqual(1);
    expect(newCart['appliedServiceFees'][0]['name']).toMatch(/5\%/);
    expect(newCart['appliedServiceFees'][0]['type']).toMatch(/percent/);
    expect(newCart['appliedServiceFees'][0]['value']).toEqual(5);
    expect(newCart['appliedServiceFees'][0]['sort']).toEqual(1);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create a new cart > Apply a new service fee > Remove service fees from the cart', () => {
    // Create a prevailing tax
    let newPrevailingTax = new Tax('prevailing', 8.875);
    // Create a new blank cart
    let newCart = new Cart([newPrevailingTax]);
    // Create a new service fee
    let orderServiceFee = new ServiceFee('5%', 'percent', 5);
    // Apply the service fee to the Cart
    newCart.applyServiceFeeToCart(orderServiceFee);
    // Remove service fees from the cart
    newCart.removeServiceFeesFromCart();

    // Validate changes
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

////////////////
// Item Level //
////////////////
