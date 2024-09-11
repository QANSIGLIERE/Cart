var { randomStringFromTemplate } = require('qansigliere-randomdatagenerators');
var { normalizeNumberToFixedDigits } = require('./utils.js');

class Cart {
    constructor(
        appliedTaxes,
        taxIncluded = false,
        items = [],
        appliedDiscounts = [],
        appliedServiceFees = [],
        isClosed = false,
    ) {
        this.appliedTaxes = appliedTaxes;
        this.taxIncluded = taxIncluded;
        this.items = items;
        this.appliedDiscounts = appliedDiscounts;
        this.appliedServiceFees = appliedServiceFees;
        this.uuid = randomStringFromTemplate('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', '0123456789abcdef');
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
        this.isClosed = isClosed;
        this.totalTaxAmount = 0;
        this.totalAmount = 0;
        this.finalTotalAmount = 0;
    }

    addItem(product, quantity = 1) {
        product['quantity'] = quantity;
        product['itemTaxAmount'] = undefined; // write the code
        product['itemPriceAmount'] = undefined; // write the code
        product['isRemoved'] = false;
        this.items.push(product);
        this.calculateOrderTax();
        this.calculateOrderTotal();
        this.updatedDate = new Date().toISOString();
    }

    removeItem() {
        this.updatedDate = new Date().toISOString();
    }

    // Calculate Modifier Prices
    // Calculate Product Taxes
    // Calculate Product Quantity

    calculateItemPrice() {}

    calculateItemTax() {}

    calculateOrderTax() {}

    calculateOrderTotal() {}

    applyDiscountToCart() {
        this.updatedDate = new Date().toISOString();
    }

    applyServiceFeeToCart() {
        this.updatedDate = new Date().toISOString();
    }

    applyDiscountToItem() {}

    applyServiceFeeToItem() {}

    removeTaxFromCart() {
        this.appliedTaxes = [];
        this.updatedDate = new Date().toISOString();
    }

    removeTaxFromItem() {}
}

module.exports.Cart = Cart;
