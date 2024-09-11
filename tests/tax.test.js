var { Tax } = require('../index.js');

test('Create a tax', () => {
    let newTax = new Tax('prevailing', 8.875);

    expect(newTax['name']).toMatch(/prevailing/);
    expect(newTax['taxRatePercentValue']).toEqual(8.875);
    expect(newTax['taxRate']).toEqual(0.08875);
    expect(Object.keys(newTax)).toEqual(['name', 'taxRatePercentValue', 'taxRate']);
});
