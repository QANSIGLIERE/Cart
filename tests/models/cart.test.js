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

    let productPrice = 9.99;
    let modifierPrice = 0.99;
    let modifierQty = 2;
    let productQty = 2;
    let newProduct = new Product(productPrice, 'Coffee Cup');
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);

    newProduct.applyModifier(newModifier, modifierQty);

    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
        taxExcludedTaxAmount: 0,
        taxIncludedTaxAmount: 0,
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

    let productPrice = 9.99;
    let modifierPrice = 0.99;
    let modifierQty = 2;
    let productQty = 2;
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [], [], [], [], true);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);

    newProduct.applyModifier(newModifier, modifierQty);

    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: 0,
        nonTaxableAmount: totalItemValue,
        taxExcludedTaxAmount: 0,
        taxIncludedTaxAmount: 0,
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

    let productPrice = 9.99;
    let modifierPrice = 0.99;
    let modifierQty = 2;
    let productQty = 2;
    let newProduct = new Product(productPrice, 'Coffee Cup');
    let newModifier = new Modifier(modifierPrice, 'Sugar', true);

    newProduct.applyModifier(newModifier, modifierQty);

    newCart.applyProductToCart(newProduct, productQty);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: productPrice * productQty,
        nonTaxableAmount: productQty * modifierQty * modifierPrice,
        taxExcludedTaxAmount: 0,
        taxIncludedTaxAmount: 0,
    });
});
