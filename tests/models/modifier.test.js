var { Modifier } = require('../../index.js');

test('Validate keys of themodifier', () => {
    let newModifier = new Modifier(0.99, 'Sugar');

    expect(Object.keys(newModifier)).toEqual(['price', 'name', 'taxFree', 'createdDate', 'updatedDate']);
});

test('Create a modifier', () => {
    let newModifier = new Modifier(0.99, 'Sugar');

    expect(newModifier.price).toEqual(0.99);
    expect(newModifier.name).toMatch(/Sugar/);
});

test('Create a tax-free modifier', () => {
    let newModifier = new Modifier(0.99, 'Sugar', true);

    expect(newModifier.price).toEqual(0.99);
    expect(newModifier.name).toMatch(/Sugar/);
    expect(newModifier.taxFree).toBeTruthy();
});
