var { randomStringFromTemplate } = require('qansigliere-randomdatagenerators');

class Cart {
    constructor(
        appliedTaxes,
        taxIncluded = false,
        appliedProducts = [],
        appliedDiscounts = [],
        appliedServiceFees = [],
        isClosed = false,
        currency = '$',
    ) {
        this.appliedTaxes = appliedTaxes;
        this.taxIncluded = taxIncluded;
        this.appliedProducts = appliedProducts;
        this.appliedDiscounts = appliedDiscounts;
        this.appliedServiceFees = appliedServiceFees;
        this.isClosed = isClosed;
        this.currency = currency;
        // Automatically generated fields
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
        this.uuid = randomStringFromTemplate('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', '0123456789abcdef');
        this.isUntaxed = false;
        this.taxIncludedAmount = 0;
        this.taxExcludedAmount = 0;
        this.totalDiscountsAmount = 0;
        this.totalServiceFeesAmount = 0;
        this.totalAmount = 0;
        this.totalTaxAmount = 0;
        this.finalTotalAmount = 0;
    }

    ////////////////
    // Cart Level //
    ////////////////
    recalculateCartValues() {
        this.updatedDate = new Date().toISOString();
    }

    // Remove any applied object from the cart
    removeObjectFromCart(keyValue) {
        this[keyValue] = [];
        this.recalculateCartValues();
    }

    removeItemsFromCart() {
        this.removeObjectFromCart('items');
    }

    /////////
    // Tax //
    /////////
    applyTaxToCart(tax) {
        this.appliedTaxes.push(tax);
        this.recalculateCartValues();
    }

    removeTaxesFromCart() {
        this.isUntaxed = true;
        this.removeObjectFromCart('appliedTaxes');
    }

    //////////////
    // Discount //
    //////////////
    applyDiscountToCart(discount) {
        this.appliedDiscounts.push(discount);
        discount.sort = this.appliedDiscounts.length;
        // Cart Level
        this.recalculateCartValues();
    }

    removeDiscountsFromCart() {
        this.removeObjectFromCart('appliedDiscounts');
    }

    /////////////////
    // Service Fee //
    /////////////////
    applyServiceFeeToCart(serviceFee) {
        this.appliedServiceFees.push(serviceFee);
        serviceFee.sort = this.appliedServiceFees.length;
        // Cart Level
        this.recalculateCartValues();
    }

    removeServiceFeesFromCart() {
        this.removeObjectFromCart('appliedServiceFees');
    }

    ////////////////
    // Item Level //
    ////////////////
    applyProductToCart(product, quantity = 1) {
        // Item level
        product.quantity = quantity;
        product.sort = this.appliedProducts.length;
        // Product QTY * Total Modifiers Price
        product.totalItemModifiersPrice = this.calculateItemModifiersPrice(product) * quantity;
        product.totalPrice = this.calculateItemPrice(product, quantity);
        // Add item to the array
        this.appliedProducts.push(product);
        // Cart Level
        this.recalculateCartValues();
    }

    removeProductFromCart(itemID) {
        // Item Level
        this.appliedProducts.splice(itemID, 1);
        // Cart Level
        this.recalculateCartValues();
    }

    changeQuantityForItem() {}

    //////////////
    // Modifier //
    //////////////
    applyModifierToItem(itemID, modifier, quantity = 1) {
        modifier.quantity = quantity;
        this.appliedProducts[itemID].appliedModifiers.push(modifier);
        // Recalculate the total modifiers price
        this.appliedProducts[itemID].totalItemModifiersPrice = this.calculateItemModifiersPrice(
            this.appliedProducts[itemID],
        );
        // Cart Level
        this.recalculateCartValues();
    }

    removeModifiersFromItem(itemID) {
        this.appliedProducts[itemID].appliedModifiers = [];
        // Cart Level
        this.recalculateCartValues();
    }

    calculateItemModifiersPrice(product) {
        let calculatedValue = product.appliedModifiers.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
            0,
        );
        return calculatedValue ? calculatedValue : 0;
    }

    calculateItemPrice(product, quantity) {
        let calculatedValue = product.price * quantity;
        return calculatedValue ? calculatedValue : 0;
    }

    /////////
    // Tax //
    /////////
    applyTaxToItem() {}

    removeTaxesFromItem() {}

    //////////////
    // Discount //
    //////////////
    applyDiscountToItem() {}

    removeDiscountsFromItem() {}

    /////////////////
    // Service Fee //
    /////////////////
    applyServiceFeeToItem() {}

    removeServiceFeesFromItem() {}
}

module.exports.Cart = Cart;
