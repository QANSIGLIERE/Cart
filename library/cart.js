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

    // Item Modifiers Prices Calculation
    calculateItemModifiersPrices(product) {
        let itemModifierPrices = product['appliedModifiers'].reduce(
            (accumulator, currentValue) => accumulator + currentValue['price'] * currentValue['quantity'],
            0,
        );
        return itemModifierPrices ? itemModifierPrices : 0;
    }

    // Item Price Calculation
    calculateItemPrice(product, quantity) {
        return (product['price'] + this.calculateItemModifiersPrices(product)) * quantity;
    }

    // Item Tax Rate Calculation
    calculateItemTaxRate(product) {
        let itemTaxRate = product['appliedTaxes'].reduce(
            (accumulator, currentValue) => accumulator + currentValue['taxRate'],
            0,
        );
        return itemTaxRate && !product['isUntaxed'] ? itemTaxRate : 0;
    }

    // Item Tax Calculation
    calculateItemTax(product) {
        let orderAppliedTaxed = this.appliedTaxes.reduce(
            (accumulator, currentValue) => accumulator + currentValue['taxRate'],
            0,
        );
        return (
            product['itemPriceAmount'] *
            (product['itemTaxRate'] + orderAppliedTaxed && !product['isUntaxed'] ? orderAppliedTaxed : 0)
        );
    }

    addItem(product, quantity = 1) {
        product['quantity'] = quantity;
        product['itemPriceAmount'] = this.calculateItemPrice(product, quantity);
        product['itemTaxRate'] = this.calculateItemTaxRate(product);
        product['itemTaxAmount'] = this.calculateItemTax(product);
        product['isRemoved'] = false;
        this.items.push(product);
        this.calculateOrderTax();
        this.calculateOrderTotal();
        this.updatedDate = new Date().toISOString();
    }

    removeItem() {
        this.updatedDate = new Date().toISOString();
    }

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
