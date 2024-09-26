var { Tax } = require('../../index.js');

test('Create a percent type tax', () => {
    let newTax = new Tax('prevailing', 'percent', 8.875);

    expect(newTax.name).toMatch(/prevailing/);
    expect(newTax.taxRatePercentValue).toEqual(8.875);
    expect(newTax.taxRate).toEqual(0.08875);
    expect(newTax.taxAmount).toEqual(0);
    expect(Object.keys(newTax)).toEqual(['name', 'type', 'taxRatePercentValue', 'taxRate', 'taxAmount']);
});

test('Create an amount type tax', () => {
    let newTax = new Tax('tabaco', 'amount', 1.01);

    expect(newTax.name).toMatch(/tabaco/);
    expect(newTax.taxRatePercentValue).toEqual(0);
    expect(newTax.taxRate).toEqual(0);
    expect(newTax.taxAmount).toEqual(1.01);
    expect(Object.keys(newTax)).toEqual(['name', 'type', 'taxRatePercentValue', 'taxRate', 'taxAmount']);
});

test('Create a tax with the wrong type', () => {
    expect(() => new Tax('prevailing', 'some text', 9)).toThrow('The type should be amount or percent');
});
