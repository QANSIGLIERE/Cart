var { Cart, Product, Modifier, Tax } = require('../../index.js');

test('Tax Included > Create an order with amount tax > Validate total values', () => {
    let taxAmount = 1.01;
    let newAmountTax = new Tax('tabaco', 'amount', taxAmount);
    let newCart = new Cart([newAmountTax], true, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.changeLog.length).toEqual(0);
    expect(newCart.taxFree).toBeFalsy();
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
});

test('Tax Included > Create an order with amount tax > Add a product with qty 2 without additional taxes > Validate total values', () => {
    let taxAmount = 1.01;
    let newAmountTax = new Tax('tabaco', 'amount', taxAmount);
    let newCart = new Cart([newAmountTax], true, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeTruthy();
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
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [], [], [], [], false, true);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
        taxIncludedTaxAmount: taxAmount * productQty,
        taxExcludedTaxAmount: 0,
        taxRatePercentValue: 0,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue);
    expect(newCart.totalTaxAmount).toEqual(taxAmount * productQty);
});

test('Tax Included > Create an order without tax > Add a product with qty 2 with amount tax > Validate total values', () => {
    let newCart = new Cart([], true, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.changeLog.length).toEqual(0);
    expect(newCart.taxFree).toBeFalsy();
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);

    let taxAmount = 1.01;
    let newAmountTax = new Tax('tabaco', 'amount', taxAmount);
    let productPrice = 9.99;
    let modifierPrice = 0.99;
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [newAmountTax], [], [], [], false, true);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
        taxIncludedTaxAmount: taxAmount * productQty,
        taxExcludedTaxAmount: 0,
        taxRatePercentValue: 0,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue);
    expect(newCart.totalTaxAmount).toEqual(taxAmount * productQty);
});

test('Tax Included > Create an order with an amount tax > Add a tax free product with qty 2 > Validate total values', () => {
    let taxAmount = 1.01;
    let newAmountTax = new Tax('tabaco', 'amount', taxAmount);
    let newCart = new Cart([newAmountTax], true, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeTruthy();
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
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [], [], [], [], true);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: 0,
        nonTaxableAmount: totalItemValue,
        taxIncludedTaxAmount: 0,
        taxExcludedTaxAmount: 0,
        taxRatePercentValue: 0,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue);
    expect(newCart.totalTaxAmount).toEqual(0);
});

test('Tax Included > Create an order with amount tax > Add a tax excluded product with qty 2 without additional taxes > Validate total values', () => {
    let taxAmount = 1.01;
    let newAmountTax = new Tax('tabaco', 'amount', taxAmount);
    let newCart = new Cart([newAmountTax], true, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeTruthy();
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
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [], [], [], [], false, false);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
        taxIncludedTaxAmount: 0,
        taxExcludedTaxAmount: taxAmount * productQty,
        taxRatePercentValue: 0,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue + taxAmount * productQty);
    expect(newCart.totalTaxAmount).toEqual(taxAmount * productQty);
});

test('Tax Included > Create an order without tax > Add a tax excluded product with qty 2 with amount tax > Validate total values', () => {
    let newCart = new Cart([], true, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.changeLog.length).toEqual(0);
    expect(newCart.taxFree).toBeFalsy();
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);

    let taxAmount = 1.01;
    let newAmountTax = new Tax('tabaco', 'amount', taxAmount);
    let productPrice = 9.99;
    let modifierPrice = 0.99;
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [newAmountTax], [], [], [], false, false);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(0);
    expect(newCart.taxIncluded).toBeTruthy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
        taxIncludedTaxAmount: 0,
        taxExcludedTaxAmount: taxAmount * productQty,
        taxRatePercentValue: 0,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue + taxAmount * productQty);
    expect(newCart.totalTaxAmount).toEqual(taxAmount * productQty);
});
