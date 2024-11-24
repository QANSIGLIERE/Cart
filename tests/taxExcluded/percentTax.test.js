var { Cart, Product, Modifier, Tax } = require('../../index.js');

test('Tax Excluded > Create an order with percent tax > Validate total values', () => {
    let taxPecentValue = 8.875;
    let newPercentTax = new Tax('regular', 'percent', taxPecentValue);
    let newCart = new Cart([newPercentTax], false, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(0);
    expect(newCart.appliedDiscounts.length).toEqual(0);
    expect(newCart.appliedServiceFees.length).toEqual(0);
    expect(newCart.changeLog.length).toEqual(0);
    expect(newCart.taxFree).toBeFalsy();
    expect(newCart.totalAmount).toEqual(0);
    expect(newCart.finalTotalAmount).toEqual(0);
    expect(newCart.totalTaxAmount).toEqual(0);
});

test('Tax Excluded > Create an order with percent tax > Add a product with qty 2 without additional taxes > Validate total values', () => {
    let taxPecentValue = 8.875;
    let newPercentTax = new Tax('regular', 'percent', taxPecentValue);
    let newCart = new Cart([newPercentTax], false, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
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
    let newProduct = new Product(productPrice, 'Coffee Cup');
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
        taxIncludedTaxAmount: 0,
        taxExcludedTaxAmount: (taxPecentValue * totalItemValue) / 100,
        taxRatePercentValue: taxPecentValue,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual((taxPecentValue * totalItemValue) / 100 + totalItemValue);
    expect(newCart.totalTaxAmount).toEqual((taxPecentValue * totalItemValue) / 100);
});

test('Tax Excluded > Create an order without tax > Add a product with qty 2 with percent tax > Validate total values', () => {
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

    let taxPecentValue = 8.875;
    let newPercentTax = new Tax('regular', 'percent', taxPecentValue);
    let productPrice = 9.99;
    let modifierPrice = 0.99;
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [newPercentTax]);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
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
        taxIncludedTaxAmount: 0,
        taxExcludedTaxAmount: (taxPecentValue * totalItemValue) / 100,
        taxRatePercentValue: taxPecentValue,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue + (taxPecentValue * totalItemValue) / 100);
    expect(newCart.totalTaxAmount).toEqual((taxPecentValue * totalItemValue) / 100);
});

test('Tax Excluded > Create an order with an percent tax > Add a tax free product with qty 2 > Validate total values', () => {
    let taxPecentValue = 8.875;
    let newPercentTax = new Tax('regular', 'percent', taxPecentValue);
    let newCart = new Cart([newPercentTax], false, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
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
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [], [], [], [], true);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeFalsy();
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

test('Tax Excluded > Create an order with percent tax > Add a tax included product with qty 2 without additional taxes > Validate total values', () => {
    let taxPecentValue = 8.875;
    let newPercentTax = new Tax('regular', 'percent', taxPecentValue);
    let newCart = new Cart([newPercentTax], false, [], [], [], false);

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
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
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [], [], [], [], false, true);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
    newCart.applyProductToCart(newProduct, productQty);

    let totalItemValue = (productPrice + modifierQty * modifierPrice) * productQty;

    // Validate the state of the cart
    expect(newCart.appliedTaxes.length).toEqual(1);
    expect(newCart.taxIncluded).toBeFalsy();
    expect(newCart.appliedProducts.length).toEqual(1);
    expect(newCart.changeLog.length).toEqual(1);
    expect(newCart.appliedProducts[0]['calculatedAmount']).toEqual({
        taxableAmount: totalItemValue,
        nonTaxableAmount: 0,
        taxIncludedTaxAmount: (totalItemValue * taxPecentValue) / (100 + taxPecentValue),
        taxExcludedTaxAmount: 0,
        taxRatePercentValue: taxPecentValue,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue);
    expect(newCart.totalTaxAmount).toEqual((totalItemValue * taxPecentValue) / (100 + taxPecentValue));
});

test('Tax Excluded > Create an order without tax > Add a tax included product with qty 2 with percent tax > Validate total values', () => {
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

    let taxPecentValue = 8.875;
    let newPercentTax = new Tax('regular', 'percent', taxPecentValue);
    let productPrice = 9.99;
    let modifierPrice = 0.99;
    let newProduct = new Product(productPrice, 'Coffee Cup', 0, [newPercentTax], [], [], [], false, true);
    let newModifier = new Modifier(modifierPrice, 'Sugar', false);
    let modifierQty = 2;
    newProduct.applyModifier(newModifier, modifierQty);
    let productQty = 2;
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
        taxIncludedTaxAmount: (totalItemValue * taxPecentValue) / (100 + taxPecentValue),
        taxExcludedTaxAmount: 0,
        taxRatePercentValue: taxPecentValue,
    });
    expect(newCart.totalAmount).toEqual(totalItemValue);
    expect(newCart.finalTotalAmount).toEqual(totalItemValue);
    expect(newCart.totalTaxAmount).toEqual((totalItemValue * taxPecentValue) / (100 + taxPecentValue));
});
