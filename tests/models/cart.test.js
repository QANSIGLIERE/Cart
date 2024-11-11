var { Cart, Product, Modifier } = require('../../index.js');

test('Validate keys of the cart', () => {
    let newCart = new Cart([], false, [], [], [], false);

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
        'taxFree',
        'changeLog',
        'totalAmount',
        'finalTotalAmount',
        'totalTaxAmount',
    ]);
});

test('Create a new cart without taxes > Add a product with 2 taxable modifiers and qty 2 > Validate total values', () => {
    let newCart = new Cart([], false, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.changeLog.length).toEqual(0);
    expect(newCart.taxFree).toBeFalsy();
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);

    let newProduct = new Product(9.99, 'Coffee Cup');
    let newModifier = new Modifier(0.99, 'Sugar', false);

    newProduct.applyModifier(newModifier, 2);

    newCart.applyProductToCart(newProduct, 2);

    let totalItemValue = (9.99 + 2 * 0.99) * 2;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
    });
});

test('Create a new cart without taxes > Add a tax free product with 2 taxable modifiers and qty 2 > Validate total values', () => {
    let newCart = new Cart([], false, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.changeLog.length).toEqual(0);
    expect(newCart.taxFree).toBeFalsy();
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);

    let newProduct = new Product(9.99, 'Coffee Cup', 0, [], [], [], [], true);
    let newModifier = new Modifier(0.99, 'Sugar', false);

    newProduct.applyModifier(newModifier, 2);

    newCart.applyProductToCart(newProduct, 2);

    let totalItemValue = (9.99 + 2 * 0.99) * 2;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: 0,
        nonTaxableAmount: totalItemValue,
    });
});

test('Create a new cart without taxes > Add a product with 2 non-taxable modifiers and qty 2 > Validate total values', () => {
    let newCart = new Cart([], false, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.changeLog.length).toEqual(0);
    expect(newCart.taxFree).toBeFalsy();
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);

    let newProduct = new Product(9.99, 'Coffee Cup');
    let newModifier = new Modifier(0.99, 'Sugar', true);

    newProduct.applyModifier(newModifier, 2);

    newCart.applyProductToCart(newProduct, 2);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: 9.99 * 2,
        nonTaxableAmount: 4 * 0.99,
    });
});
