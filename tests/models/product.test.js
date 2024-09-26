var { Tax, Product, Modifier } = require('../../index.js');

test('Create a product', () => {
    let newProduct = new Product(4.99, 'Coffee Cup');

    expect(newProduct.cost).toEqual(0);
    expect(newProduct.appliedTaxes.length).toEqual(0);
    expect(newProduct.appliedDiscounts.length).toEqual(0);
    expect(newProduct.appliedServiceFees.length).toEqual(0);
    expect(newProduct.appliedModifiers.length).toEqual(0);
    expect(newProduct.taxIncluded).toBeFalsy();
    expect(newProduct.isUntaxed).toBeFalsy();
    expect(newProduct.price).toEqual(4.99);
    expect(newProduct.name).toMatch(/Coffee Cup/);

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

test('Create a product > Assign new tax to the product', () => {
    let newItemTax = new Tax('Alc', 'percent', 6);
    let newProduct = new Product(4.99, 'Coffee Cup');

    newProduct.applyTax(newItemTax);

    expect(newProduct.appliedTaxes.length).toEqual(1);
    expect(newProduct.appliedTaxes).toEqual([newItemTax]);
});

test('Create a product > Assign a new modifier to the product', () => {
    let newModifier = new Modifier(0.99, 'Sugar');
    let newProduct = new Product(4.99, 'Coffee Cup');

    newProduct.applyModifier(newModifier, 2);

    expect(newProduct.appliedModifiers.length).toEqual(1);
    expect(newProduct.appliedModifiers).toEqual([newModifier]);
});
