var { Product } = require('../index.js');

test('Create a product', () => {
    let newProduct = new Product(4.99, 'Coffee Cup');

    expect(newProduct['cost']).toEqual(0);
    expect(newProduct['appliedTaxes'].length).toEqual(0);
    expect(newProduct['appliedDiscounts'].length).toEqual(0);
    expect(newProduct['appliedServiceFees'].length).toEqual(0);
    expect(newProduct['appliedModifiers'].length).toEqual(0);
    expect(newProduct['taxIncluded']).toBeFalsy();
    expect(newProduct['isUntaxed']).toBeFalsy();
    expect(newProduct['price']).toEqual(4.99);
    expect(newProduct['name']).toMatch(/Coffee Cup/);

    expect(Object.keys(newProduct)).toEqual([
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
    ]);
});
