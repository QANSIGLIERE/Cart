var { Tax } = require('../../index.js');

test('Create a tax', () => {
    let newTax = new Tax('prevailing', 8.875);

    expect(newTax.name).toMatch(/prevailing/);
    expect(newTax.taxRatePercentValue).toEqual(8.875);
    expect(newTax.taxRate).toEqual(0.08875);
    expect(newTax.fixedValue).toEqual(0);
    expect(Object.keys(newTax)).toEqual(['name', 'taxRatePercentValue', 'taxRate', 'fixedValue']);
});

test('Create a tax with the fixed value', () => {
    let newTax = new Tax('prevailing', 0, 1.41);

    expect(newTax.name).toMatch(/prevailing/);
    expect(newTax.taxRatePercentValue).toEqual(0);
    expect(newTax.taxRate).toEqual(0);
    expect(newTax.fixedValue).toEqual(1.41);
    expect(Object.keys(newTax)).toEqual(['name', 'taxRatePercentValue', 'taxRate', 'fixedValue']);
});
