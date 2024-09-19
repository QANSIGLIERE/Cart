var { Modifier } = require('../../index.js');

test('Create a modifier', () => {
    let newModifier = new Modifier(0.99, 'Sugar');

    expect(newModifier.price).toEqual(0.99);
    expect(newModifier.name).toMatch(/Sugar/);

    expect(Object.keys(newModifier)).toEqual(['price', 'name', 'createdDate', 'updatedDate']);
});
