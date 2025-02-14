# Cart

This library is based on Javascript language and it contains methods that emulate the behavior of the cart when adding
or changing items in it

## Author

https://www.youtube.com/@QANSIGLIERE/

## Support the project

https://buymeacoffee.com/qansigliere

## Installation

Using npm:

`npm i qansigliere-cart`

## Models

### Tax

Tax is an object to emulate the tax behavior. The tax structure has the following fields:

-   name
-   type ** amount ** percent
-   taxRatePercentValue
-   taxRate
-   taxAmount

#### Common JS

```
var { Tax } = require('qansigliere-cart');
// Create a tax with the percent amount
let newPrevailingTax = new Tax('prevailing', 'percent', 8.875);
```

#### ES Module

```
import { Tax } from 'qansigliere-cart';
// Create a tax with the fixed amount
let newPrevailingTax = new Tax('tabaco', 'amount', 1.01);
```

### Modifier

The modifier, as in real life, is used to change the original price of the product. The modifier structure has the
following fields:

-   price
-   name
-   createdDate
-   updatedDate

#### Common JS

```
var { Modifier } = require('qansigliere-cart');

let newModifier = new Modifier('sugar', 0.99);
```

#### ES Module

```
import { Modifier } from 'qansigliere-cart';

let newModifier = new Modifier('water', 0);
```

### Product

The product is the object that we are going to put in the cart and for which all the necessary taxes will be
calculated.. The product structure has the following fields:

-   price
-   name
-   cost
-   appliedTaxes
-   appliedModifiers
-   appliedDiscounts
-   appliedServiceFees
-   isUntaxed
-   taxIncluded
-   createdDate
-   updatedDate

#### Common JS

```
var { Product } = require('qansigliere-cart');

new Product(5.99, 'Brownie');
```

#### ES Module

```
import { Product } from 'qansigliere-cart';

new Product(5.99, 'Brownie');
```

### Discount

### Service Fee

### Cart

## Example

### CommonJS

```
var { Tax, Product, Modifier, Discount, ServiceFee, Cart } = require('qansigliere-cart');

// Create a new empty cart
let newCart = new Cart([], false, [], [], []);
// Create a new item
let newItem = new Product(5.99, 'Brownie');
// Add the item to the cart
newCart.applyProductToCart(newItem, 3);
// Create a new percent type tax
let newPercentTax = new Tax('Regular', 'percent', 8.875);
// Apply the tax to the item
newCart.applyTaxToItem(0, newPercentTax);
// Create a new percent type tax
let newCartPercentTax = new Tax('Local', 'percent', 1.25);
// Apply the percent tax to the cart
newCart.applyTaxToCart(newCartPercentTax);

JSON.stringify(newCart);
```

Output

```
{
"appliedTaxes":[
{
"name":"Regular",
"type":"percent",
"taxRatePercentValue":8.875,
"taxRate":0.08875,
"taxAmount":0
}
],
"taxIncluded":false,
"appliedProducts":[
{
"cost":0,
"price":5.99,
"name":"Brownie",
"appliedTaxes":[
],
"appliedModifiers":[
],
"appliedDiscounts":[
],
"appliedServiceFees":[
],
"isUntaxed":false,
"taxIncluded":false,
"createdDate":"2024-10-08T15:05:28.278Z",
"updatedDate":"2024-10-08T15:05:28.278Z",
"quantity":1,
"sort":1,
"totalValues":{
"totalPrice":5.99,
"totalItemModifierPrice":0,
"itemTaxIncludedAmount":0,
"itemTaxExcludedAmount":0.5316125,
"totalItemTaxRate":0.08875
}
},
{
"cost":0,
"price":5.99,
"name":"Brownie",
"appliedTaxes":[
],
"appliedModifiers":[
],
"appliedDiscounts":[
],
"appliedServiceFees":[
],
"isUntaxed":false,
"taxIncluded":false,
"createdDate":"2024-10-08T15:05:28.278Z",
"updatedDate":"2024-10-08T15:05:28.278Z",
"quantity":1,
"sort":1,
"totalValues":{
"totalPrice":5.99,
"totalItemModifierPrice":0,
"itemTaxIncludedAmount":0,
"itemTaxExcludedAmount":0.5316125,
"totalItemTaxRate":0.08875
}
}
],
"appliedDiscounts":[
],
"appliedServiceFees":[
],
"isClosed":false,
"currency":"$",
"createdDate":"2024-10-08T15:05:28.277Z",
"updatedDate":"2024-10-08T15:05:28.278Z",
"uuid":"aef19030-bca4-961a-bdcd-6e7df7a04e9f",
"isUntaxed":false,
"taxIncludedAmount":0,
"taxExcludedAmount":1.063225,
"totalDiscountsAmount":0,
"totalServiceFeesAmount":0,
"totalAmount":11.98,
"totalTaxAmount":1.063225,
"finalTotalAmount":13.043225
}
```

### ES Module

```
import { Tax, Product, Modifier, Discount, ServiceFee, Cart } from 'qansigliere-cart';

// Create a new empty cart
let newCart = new Cart([], false, [], [], []);
// Create a new item
let newItem = new Product(5.99, 'Brownie');
// Add the item to the cart
newCart.applyProductToCart(newItem, 3);
// Create a new percent type tax
let newPercentTax = new Tax('Regular', 'percent', 8.875);
// Apply the tax to the item
newCart.applyTaxToItem(0, newPercentTax);
// Create a new percent type tax
let newCartPercentTax = new Tax('Local', 'percent', 1.25);
// Apply the percent tax to the cart
newCart.applyTaxToCart(newCartPercentTax);

JSON.stringify(newCart);
```

Output

```
{
"appliedTaxes":[
{
"name":"Regular",
"type":"percent",
"taxRatePercentValue":8.875,
"taxRate":0.08875,
"taxAmount":0
}
],
"taxIncluded":false,
"appliedProducts":[
{
"cost":0,
"price":5.99,
"name":"Brownie",
"appliedTaxes":[
],
"appliedModifiers":[
],
"appliedDiscounts":[
],
"appliedServiceFees":[
],
"isUntaxed":false,
"taxIncluded":false,
"createdDate":"2024-10-08T15:05:28.278Z",
"updatedDate":"2024-10-08T15:05:28.278Z",
"quantity":1,
"sort":1,
"totalValues":{
"totalPrice":5.99,
"totalItemModifierPrice":0,
"itemTaxIncludedAmount":0,
"itemTaxExcludedAmount":0.5316125,
"totalItemTaxRate":0.08875
}
},
{
"cost":0,
"price":5.99,
"name":"Brownie",
"appliedTaxes":[
],
"appliedModifiers":[
],
"appliedDiscounts":[
],
"appliedServiceFees":[
],
"isUntaxed":false,
"taxIncluded":false,
"createdDate":"2024-10-08T15:05:28.278Z",
"updatedDate":"2024-10-08T15:05:28.278Z",
"quantity":1,
"sort":1,
"totalValues":{
"totalPrice":5.99,
"totalItemModifierPrice":0,
"itemTaxIncludedAmount":0,
"itemTaxExcludedAmount":0.5316125,
"totalItemTaxRate":0.08875
}
}
],
"appliedDiscounts":[
],
"appliedServiceFees":[
],
"isClosed":false,
"currency":"$",
"createdDate":"2024-10-08T15:05:28.277Z",
"updatedDate":"2024-10-08T15:05:28.278Z",
"uuid":"aef19030-bca4-961a-bdcd-6e7df7a04e9f",
"isUntaxed":false,
"taxIncludedAmount":0,
"taxExcludedAmount":1.063225,
"totalDiscountsAmount":0,
"totalServiceFeesAmount":0,
"totalAmount":11.98,
"totalTaxAmount":1.063225,
"finalTotalAmount":13.043225
}

```

## TO DO List

1. Voided items
2. Remove any item from the cart
3. Item discount amount calculation
4. Item service fee calculation
5. Inventory
6. Send a receipt by email
7. Show the currency in totals
8. Support item discounts
9. Support item service fees
10. Support order discounts
11. Support order service fees
12. Support order id
13. Implement untaxed logic

TO DO:

Possible scenarios Cart level:

-   Create a blank card
-   Add additional tax to the Cart
-   Add Item to the Cart
-   Add Discount to the Cart
-   Add Service Fee to the Cart

Service Fee level:

-   Add service fee to the Cart (amount / percent)
-   Add service fee to the Item (amount / percent)
-   Remove service fee from the Cart
-   Remove service fee from teh item

Discount level:

-   Add discount to the Cart (amount / percent)
-   Add discount to the Item (amount / percent)
-   Remove discount from the Cart
-   Remove discount from teh item

Taxes level:

-   Add a tax to the Cart
-   Add a tax to the Item
-   Remove a tax from the Cart
-   Remove a tax from teh item

Tax Countries level:

-   Tax Included
-   Tax Excluded

Product level:

-   Zero price
-   Change quantity
-   Tax included item
-   Untaxed item

Modifier level:

-   Add a modifier to the product
-   Change quantity value for any modifier
-   Remove modifier from the product

For taxes: Support taxes with $ and % value types

For cart: Show the currency icon in total values

## Related Videos

-   https://www.youtube.com/live/1YEWF6uZc6g?si=kbIbpkdxD03w2_mo
-   https://www.youtube.com/live/CeYFFrmm1p0?si=8g-CDKR270IUYtRk

## Improvements & Suggestions

https://forms.gle/GZbS9hw42tSYJxKL7
