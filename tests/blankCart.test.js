var { Tax, Product, Modifier, Cart } = require('../index.js');

////////////////
// Blank Cart //
////////////////

test('Create a new blank cart', () => {
    let newCart = new Cart([]);

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(0);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);

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
    ]);
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
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});

test('Create a new blank cart with the prevailing tax > remove taxes from the cart', () => {
    let newTax = new Tax('prevailing', 8.875);
    let newCart = new Cart([newTax]);

    newCart.removeTaxFromCart();

    expect(newCart['appliedTaxes'].length).toEqual(0);
    expect(newCart['taxIncluded']).toBeFalsy();
    expect(newCart['items'].length).toEqual(0);
    expect(newCart['appliedDiscounts'].length).toEqual(0);
    expect(newCart['appliedServiceFees'].length).toEqual(0);
    expect(newCart['isClosed']).toBeFalsy();
    expect(newCart['totalTaxAmount']).toEqual(0);
    expect(newCart['totalAmount']).toEqual(0);
    expect(newCart['finalTotalAmount']).toEqual(0);
});
