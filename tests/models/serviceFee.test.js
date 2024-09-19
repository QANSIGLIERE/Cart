var { ServiceFee } = require('../../index.js');

test('Create an incorrect service fee', () => {
    expect(() => new ServiceFee('invalid', 'text', 12)).toThrow('The type should be amount or percent');
});

test('Create an amount type service fee', () => {
    let serviceFee = new ServiceFee('10$', 'amount', 10);

    expect(serviceFee.value).toEqual(10);
    expect(serviceFee.type).toEqual('amount');
    expect(serviceFee.isTaxable).toBeFalsy();
    expect(serviceFee.name).toMatch(/10\$/);

    expect(Object.keys(serviceFee)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});

test('Create a percent type service fee', () => {
    let serviceFee = new ServiceFee('5%', 'percent', 5);

    expect(serviceFee.value).toEqual(5);
    expect(serviceFee.type).toEqual('percent');
    expect(serviceFee.isTaxable).toBeFalsy();
    expect(serviceFee.name).toMatch(/5\%/);

    expect(Object.keys(serviceFee)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});

test('Create a taxable amount type service fee', () => {
    let serviceFee = new ServiceFee('10$', 'amount', 10, true);

    expect(serviceFee.value).toEqual(10);
    expect(serviceFee.type).toEqual('amount');
    expect(serviceFee.isTaxable).toBeTruthy();
    expect(serviceFee.name).toMatch(/10\$/);

    expect(Object.keys(serviceFee)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});

test('Create a taxable percent type service fee', () => {
    let serviceFee = new ServiceFee('5%', 'percent', 5, true);

    expect(serviceFee.value).toEqual(5);
    expect(serviceFee.type).toEqual('percent');
    expect(serviceFee.isTaxable).toBeTruthy();
    expect(serviceFee.name).toMatch(/5\%/);

    expect(Object.keys(serviceFee)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});
