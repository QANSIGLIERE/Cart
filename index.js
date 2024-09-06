var { Tax, Product, Cart } = require('./library/cart.js');

console.log(JSON.stringify(new Tax('prev', 8.873)));
console.log(JSON.stringify(new Product(0, 2.98, 'apple', 1)));
console.log(JSON.stringify(new Cart(9.235)));

module.exports.Tax = Tax;
module.exports.Product = Product;
module.exports.Cart = Cart;
