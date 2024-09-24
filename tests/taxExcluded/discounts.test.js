var { Tax, Product, Modifier, Cart, Discount, ServiceFee } = require('../../index.js');

/////////////////
// Order Level //
/////////////////
test('Create a new cart > Apply a new discount', () => {
    // Create a prevailing tax
    let newPrevailingTax = new Tax('prevailing', 8.875);
    // Create a new blank cart
    let newCart = new Cart([newPrevailingTax]);
    // Create a new discount
    let orderDiscount = new Discount('5%', 'percent', 5);
    // Apply the discount to the Cart
    newCart.applyDiscountToCart(orderDiscount);

    // Validate changes
    expect(newCart.appliedDiscounts.length).toEqual(1);
    expect(newCart['appliedDiscounts'][0]['name']).toMatch(/5\%/);
    expect(newCart['appliedDiscounts'][0]['type']).toMatch(/percent/);
    expect(newCart['appliedDiscounts'][0]['value']).toEqual(5);
    expect(newCart['appliedDiscounts'][0]['sort']).toEqual(1);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

test('Create a new cart > Apply a new discount > Remove discounts from the cart', () => {
    // Create a prevailing tax
    let newPrevailingTax = new Tax('prevailing', 8.875);
    // Create a new blank cart
    let newCart = new Cart([newPrevailingTax]);
    // Create a new discount
    let orderDiscount = new Discount('5%', 'percent', 5);
    // Apply the discount to the Cart
    newCart.applyDiscountToCart(orderDiscount);
    // Remove discounts from the cart
    newCart.removeDiscountsFromCart();

    // Validate changes
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
});

////////////////
// Item Level //
////////////////
