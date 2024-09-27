# Cart

This library is based on Javascript language and it contains methods that emulate the behavior of the cart when adding
or changing items in it

## Author

https://www.youtube.com/@QANSIGLIERE/

???

## Installing

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

### Discount

### Service Fee

### Cart

## Example

### CommonJS

```
???
```

Output

```
???
```

### ES Module

```
???

```

Output

```

???

```

## Improvements and Suggestions

https://forms.gle/wBX3TDesi2Xv3Zjr9

## TO DO List

1. Voided items
2. Remove any item from the cart
3. Item tax calculation
4. Product modifier price calculation
5. Item discount amount calculation
6. Item service fee calculation
7. Include quantity in calculations
8. Gratuity
9. Inventory
10. Send a receipt by email
11. Show the currency in totals
12. Support item quantity
13. Support item discounts
14. Support item service fees
15. Support item taxes
16. Support remove taxes
17. Support order discounts
18. Support order service fees
19. Support order id
20. Support modifiers
21. Implement untaxed logic

TO DO:

order with tax > 2 qty product order with tax > 2 qty product > remove tax from item order with tax > 2 qty product +
tax order with tax > 2 qty product + tax > remove tax from item order with tax > 2 qty product + modifiers order with
tax > 2 qty product + modifiers > remove tax from item order with tax > 2 qty product + tax + modifiers order with tax >
2 qty product + tax + modifiers > remove tax from item order with tax > 2 qty product + modifiers 2x order with tax > 2
qty product + modifiers 2x > remove tax from item order with tax > 2 qty product + tax + modifiers 2x order with tax > 2
qty product + tax + modifiers 2x > remove tax from item

order with tax > 1 qty product 2x order with tax > 1 qty product 2x > remove tax from item order with tax > 1 qty
product + tax 2x order with tax > 1 qty product + tax 2x > remove tax from item order with tax > 1 qty product +
modifiers 2x order with tax > 1 qty product + modifiers 2x > remove tax from item order with tax > 1 qty product + tax +
modifiers 2x order with tax > 1 qty product + tax + modifiers 2x > remove tax from item order with tax > 1 qty product +
modifiers 2x 2x order with tax > 1 qty product + modifiers 2x 2x > remove tax from item order with tax > 1 qty product +
tax + modifiers 2x 2x order with tax > 1 qty product + tax + modifiers 2x 2x > remove tax from item

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
