var { Tax, Product, Cart } = require('../index.js');

test('Create a tax', () => {
    let newTax = new Tax('prevailing', 8.875);

    expect(newTax['name']).toMatch(/prevailing/);
    expect(newTax['taxRatePercentValue']).toEqual(8.875);
    expect(newTax['taxRate']).toEqual(0.08875);
});

test('Create a product', () => {
    let newProduct = new Product(4.99, 'Mi Band', 1);

    expect(newProduct['cost']).toEqual(0);
    expect(newProduct['appliedTaxes'].length).toEqual(0);
    expect(newProduct['appliedDiscounts'].length).toEqual(0);
    expect(newProduct['appliedServiceFees'].length).toEqual(0);
    expect(newProduct['taxIncluded']).toBeFalsy();
    expect(newProduct['price']).toEqual(4.99);
    expect(newProduct['name']).toMatch(/Mi Band/);
    expect(newProduct['quantity']).toEqual(1);
    expect(newProduct['orderTaxAmount']).toEqual(0);
});

test('Create a new blank cart', () => {
    let newCart = new Cart([]);

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(0);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);

    expect(newCart['appliedTaxes'][0]['name']).toMatch(/prevailing/);
    expect(newCart['appliedTaxes'][0]['taxRatePercentValue']).toEqual(8.875);
    expect(newCart['appliedTaxes'][0]['taxRate']).toEqual(0.08875);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(0);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax > remove taxes from the cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);

    newCart.removeTaxesFromCart();

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(0);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax > Add 1 product', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 1);

    newCart.addItem(newProduct);

    expect(newCart['appliedTaxes'][0]['name']).toMatch(/prevailing/);
    expect(newCart['appliedTaxes'][0]['taxRatePercentValue']).toEqual(8.875);
    expect(newCart['appliedTaxes'][0]['taxRate']).toEqual(0.08875);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0.44);
    expect(newCart['totalAmount']).toEqual(5.43);
});

test('Create a new blank cart with the prevailing tax > Add 1 product > Remove taxes from cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 1);

    newCart.addItem(newProduct);
    newCart.removeTaxesFromCart();

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(4.99);
});

test('Create a new blank cart with the prevailing tax > Add one product with qty 2', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 2);

    newCart.addItem(newProduct);

    expect(newCart['appliedTaxes'][0]['name']).toMatch(/prevailing/);
    expect(newCart['appliedTaxes'][0]['taxRatePercentValue']).toEqual(8.875);
    expect(newCart['appliedTaxes'][0]['taxRate']).toEqual(0.08875);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0.89);
    expect(newCart['totalAmount']).toEqual(10.86);
});

test('Create a new blank cart with the prevailing tax > Add one product with qty 2 > Remove taxes from cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 2);

    newCart.addItem(newProduct);
    newCart.removeTaxesFromCart();

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(9.98);
});

test('Create a new blank cart with the prevailing tax > Add one product with qty 1 > Add one product with qty 1', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 1);

    newCart.addItem(newProduct);
    newCart.addItem(newProduct);

    expect(newCart['appliedTaxes'][0]['name']).toMatch(/prevailing/);
    expect(newCart['appliedTaxes'][0]['taxRatePercentValue']).toEqual(8.875);
    expect(newCart['appliedTaxes'][0]['taxRate']).toEqual(0.08875);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(2);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0.89);
    expect(newCart['totalAmount']).toEqual(10.86);
});

test('Create a new blank cart with the prevailing tax > Add one product with qty 1 > Add one product with qty 1 > Remove taxes from cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 1);

    newCart.addItem(newProduct);
    newCart.addItem(newProduct);
    newCart.removeTaxesFromCart();

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(2);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(9.98);
});

test('Create a new blank cart with the prevailing tax > Add one product with qty 2.4545', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 2.4545);

    newCart.addItem(newProduct);

    expect(newCart['appliedTaxes'][0]['name']).toMatch(/prevailing/);
    expect(newCart['appliedTaxes'][0]['taxRatePercentValue']).toEqual(8.875);
    expect(newCart['appliedTaxes'][0]['taxRate']).toEqual(0.08875);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(1.09);
    expect(newCart['totalAmount']).toEqual(13.34);
});

test('Create a new blank cart with the prevailing tax > Add one product with qty 2.4545 > Remove taxes from cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);
    let newProduct = new Product(4.99, 'Mi Band', 2.4545);

    newCart.addItem(newProduct);
    newCart.removeTaxesFromCart();

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(1);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['taxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(12.25);
});
