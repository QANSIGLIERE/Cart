var { Tax, Product, Modifier, Cart } = require('../index.js');

/////////////////////////////
// Single Item in the Cart //
/////////////////////////////

//order with tax > 1 qty product zero price > remove tax from item
//order with tax > 1 qty product zero price + tax
//order with tax > 1 qty product zero price + tax > remove tax from item
//order with tax > 1 qty product zero price + modifiers
//order with tax > 1 qty product zero price + modifiers > remove tax from item
//order with tax > 1 qty product zero price + tax + modifiers
//order with tax > 1 qty product zero price + tax + modifiers > remove tax from item
//order with tax > 1 qty product zero price + modifiers 2x
//order with tax > 1 qty product zero price + modifiers 2x > remove tax from item
//order with tax > 1 qty product zero price + tax + modifiers 2x
//order with tax > 1 qty product zero price + tax + modifiers 2x > remove tax from item

//order with tax > 1 qty product isUntaxed > remove tax from item
//order with tax > 1 qty product isUntaxed + tax
//order with tax > 1 qty product isUntaxed + tax > remove tax from item
//order with tax > 1 qty product isUntaxed + modifiers
//order with tax > 1 qty product isUntaxed + modifiers > remove tax from item
//order with tax > 1 qty product isUntaxed + tax + modifiers
//order with tax > 1 qty product isUntaxed + tax + modifiers > remove tax from item
//order with tax > 1 qty product isUntaxed + modifiers 2x
//order with tax > 1 qty product isUntaxed + modifiers 2x > remove tax from item
//order with tax > 1 qty product isUntaxed + tax + modifiers 2x
//order with tax > 1 qty product isUntaxed + tax + modifiers 2x > remove tax from item

//order with tax > 1 qty product
//order with tax > 1 qty product > remove tax from item
//order with tax > 1 qty product + tax
//order with tax > 1 qty product + tax > remove tax from item
//order with tax > 1 qty product + modifiers
//order with tax > 1 qty product + modifiers > remove tax from item
//order with tax > 1 qty product + tax + modifiers
//order with tax > 1 qty product + tax + modifiers > remove tax from item
//order with tax > 1 qty product + modifiers 2x
//order with tax > 1 qty product + modifiers 2x > remove tax from item
//order with tax > 1 qty product + tax + modifiers 2x
//order with tax > 1 qty product + tax + modifiers 2x > remove tax from item

//order with tax > 1 qty product zero price

test('Create a new blank cart with the prevailing tax', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(0, 'Brownie');

    newCart.addItem(newProduct, 1);

    // Item Level
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['items'][0]['quantity']).toEqual(1);
    expect(newCart['items'][0]['itemTaxAmount']).toEqual(0);
    expect(newCart['items'][0]['itemPriceAmount']).toEqual(0);
    expect(newCart['items'][0]['isRemoved']).toBeFalsy();

    // Order Level
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});
