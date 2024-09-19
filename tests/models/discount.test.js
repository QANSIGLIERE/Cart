var { Discount } = require('../../index.js');

test('Create an incorrect discount', () => {
    expect(() => new Discount('invalid', 'text', 12)).toThrow('The type should be amount or percent');
});

test('Create an amount type discount', () => {
    let discount = new Discount('10$', 'amount', 10);

    expect(discount.value).toEqual(10);
    expect(discount.type).toEqual('amount');
    expect(discount.isTaxable).toBeFalsy();
    expect(discount.name).toMatch(/10\$/);

    expect(Object.keys(discount)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});

test('Create a percent type discount', () => {
    let discount = new Discount('5%', 'percent', 5);

    expect(discount.value).toEqual(5);
    expect(discount.type).toEqual('percent');
    expect(discount.isTaxable).toBeFalsy();
    expect(discount.name).toMatch(/5\%/);

    expect(Object.keys(discount)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});

test('Create a percent type discount with value more than 100%', () => {
    let discount = new Discount('120%', 'percent', 120);

    expect(discount.value).toEqual(100);
    expect(discount.type).toEqual('percent');
    expect(discount.isTaxable).toBeFalsy();
    expect(discount.name).toMatch(/120\%/);

    expect(Object.keys(discount)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});

test('Create a taxable amount type discount', () => {
    let discount = new Discount('10$', 'amount', 10, true);

    expect(discount.value).toEqual(10);
    expect(discount.type).toEqual('amount');
    expect(discount.isTaxable).toBeTruthy();
    expect(discount.name).toMatch(/10\$/);

    expect(Object.keys(discount)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});

test('Create a taxable percent type discount', () => {
    let discount = new Discount('5%', 'percent', 5, true);

    expect(discount.value).toEqual(5);
    expect(discount.type).toEqual('percent');
    expect(discount.isTaxable).toBeTruthy();
    expect(discount.name).toMatch(/5\%/);

    expect(Object.keys(discount)).toEqual(['name', 'type', 'value', 'isTaxable', 'createdDate', 'updatedDate']);
});
