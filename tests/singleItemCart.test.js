var { Tax, Product, Modifier, Cart } = require('../index.js');
var { normalizeNumberToFixedDigits } = require('../models/utils.js');

/////////////////////////////
// Single Item in the Cart //
/////////////////////////////

// NEXT: REFACTOR CART METHODS

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

/////////////////////////////////
// One product with zero price //
/////////////////////////////////

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(0, 'Brownie');

    newCart.addItem(newProduct, 1);

    // Item Level
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['items'][0]['quantity']).toEqual(1);
    expect(newCart['items'][0]['itemTaxRate']).toEqual(0);
    expect(newCart['items'][0]['itemTaxAmount']).toEqual(0);
    expect(newCart['items'][0]['itemPriceAmount']).toEqual(0);
    expect(newCart['items'][0]['isRemoved']).toBeFalsy();
    expect(Object.keys(newCart['items'][0])).toEqual([
        'cost',
        'price',
        'name',
        'appliedTaxes',
        'appliedModifiers',
        'appliedDiscounts',
        'appliedServiceFees',
        'isUntaxed',
        'taxIncluded',
        'createdDate',
        'updatedDate',
        'quantity',
        'itemPriceAmount',
        'itemTaxRate',
        'itemTaxAmount',
        'isRemoved',
        'sort',
    ]);

    // Order Level
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price > remove taxes from the cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(0, 'Brownie');

    newCart.addItem(newProduct, 1);
    newCart.removeTaxesFromCart();

    // Order Level
    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['appliedTaxes']).toEqual([]);
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price > remove taxes from the item', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(0, 'Brownie');

    newCart.addItem(newProduct, 1);
    newCart.removeTaxesFromItem(0);

    // Item Level
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['items'][0]['quantity']).toEqual(1);
    expect(newCart['items'][0]['itemTaxAmount']).toEqual(0);
    expect(newCart['items'][0]['itemTaxRate']).toEqual(0);
    expect(newCart['items'][0]['itemPriceAmount']).toEqual(0);

    // Order Level
    expect(newCart['appliedTaxes'].length).toEqual(1);
    expect(newCart['appliedTaxes']).toEqual([newTax]);
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});

//////////////////////////////////////////////////////
// One product with zero price and additional taxes //
//////////////////////////////////////////////////////

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price with applied taxes', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);

    let newItemTax = new Tax('Alc', 6);
    let newProduct = new Product(0, 'Brownie');
    newProduct.applyTax(newItemTax);

    newCart.addItem(newProduct, 1);

    // Item Level
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['items'][0]['quantity']).toEqual(1);
    expect(newCart['items'][0]['appliedTaxes']).toEqual([newItemTax]);
    expect(newCart['items'][0]['itemTaxAmount']).toEqual(0);
    expect(newCart['items'][0]['itemTaxRate']).toEqual(0.06);
    expect(newCart['items'][0]['itemPriceAmount']).toEqual(0);
    expect(newCart['items'][0]['isRemoved']).toBeFalsy();

    // Order Level
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price with applied taxes > remove taxes from the cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);

    let newItemTax = new Tax('Alc', 6);
    let newProduct = new Product(0, 'Brownie');
    newProduct.applyTax(newItemTax);

    newCart.addItem(newProduct, 1);
    newCart.removeTaxesFromCart();

    // Order Level
    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['appliedTaxes']).toEqual([]);
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price with applied taxes > remove taxes from the item', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);

    let newItemTax = new Tax('Alc', 6);
    let newProduct = new Product(0, 'Brownie');
    newProduct.applyTax(newItemTax);

    newCart.addItem(newProduct, 1);
    newCart.removeTaxesFromItem(0);

    // Item Level
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['items'][0]['quantity']).toEqual(1);
    expect(newCart['items'][0]['itemTaxAmount']).toEqual(0);
    expect(newCart['items'][0]['itemTaxRate']).toEqual(0);
    expect(newCart['items'][0]['itemPriceAmount']).toEqual(0);

    // Order Level
    expect(newCart['appliedTaxes'].length).toEqual(1);
    expect(newCart['appliedTaxes']).toEqual([newTax]);
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});

///////////////////////////////////////////////
// One product with zero price and modifiers //
///////////////////////////////////////////////

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price and modifiers', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newModifier = new Modifier(0.99, 'Sugar');
    let newProduct = new Product(0, 'Brownie');
    newProduct.applyModifier(newModifier, 1);

    newCart.addItem(newProduct, 1);

    // Item Level
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['items'][0]['quantity']).toEqual(1);
    expect(newCart['items'][0]['itemTaxRate']).toEqual(0);
    expect(normalizeNumberToFixedDigits(newCart['items'][0]['itemTaxAmount'], 2)).toEqual(0.09);
    expect(newCart['items'][0]['itemPriceAmount']).toEqual(0.99);
    expect(newCart['items'][0]['isRemoved']).toBeFalsy();

    // Order Level
    expect(normalizeNumberToFixedDigits(newCart['totalTaxAmount'], 2)).toEqual(0.09);
    expect(newCart['totalAmount']).toEqual(0.99);
    expect(normalizeNumberToFixedDigits(newCart['finalTotalAmount'], 2)).toEqual(1.08);
});

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price and modifiers > remove taxes from the cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newModifier = new Modifier(0.99, 'Sugar');
    let newProduct = new Product(0, 'Brownie');
    newProduct.applyModifier(newModifier, 1);

    newCart.addItem(newProduct, 1);
    newCart.removeTaxesFromCart();

    // Order Level
    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['appliedTaxes']).toEqual([]);
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0.99);
    expect(newCart['finalTotalAmount']).toEqual(0.99);
});

test('Create a new blank cart with the prevailing tax > Add 1 product with zero price and modifiers > remove taxes from the item', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newModifier = new Modifier(0.99, 'Sugar');
    let newProduct = new Product(0, 'Brownie');
    newProduct.applyModifier(newModifier, 1);

    newCart.addItem(newProduct, 1);
    newCart.removeTaxesFromItem(0);

    // Item Level
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['items'][0]['quantity']).toEqual(1);
    expect(newCart['items'][0]['itemTaxAmount']).toEqual(0);
    expect(newCart['items'][0]['itemTaxRate']).toEqual(0);
    expect(newCart['items'][0]['itemPriceAmount']).toEqual(0.99);

    // Order Level
    expect(newCart['appliedTaxes'].length).toEqual(1);
    expect(newCart['appliedTaxes']).toEqual([newTax]);
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0.99);
    expect(newCart['finalTotalAmount']).toEqual(0.99);
});
