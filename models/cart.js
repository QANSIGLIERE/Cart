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
        this.totalAmount = this.calculateTotalAmount();
        this.taxIncludedAmount = this.calculateTaxIncludedAmountFromItems();
        this.taxExcludedAmount = this.calculateTaxExcludedAmountFromItems();
        this.calculateAmountTaxesFromCart();
        this.totalTaxAmount = this.calculateTotalTaxAmount();
        this.finalTotalAmount = this.calculateFinalTotalAmount();
        this.updatedDate = new Date().toISOString();
    }

    calculateTotalTaxAmount() {
        return this.taxIncludedAmount + this.taxExcludedAmount;
    }

    calculateTotalAmount() {
        let totalProductPrice = this.appliedProducts.reduce(
            (accumulator, currentValue) =>
                accumulator + currentValue.totalValues.totalPrice + currentValue.totalValues.totalItemModifierPrice,
            0,
        );
        return totalProductPrice ? totalProductPrice : 0;
    }

    calculateFinalTotalAmount() {
        if (this.taxIncluded) {
            return this.totalAmount;
        } else {
            return this.totalAmount + this.taxExcludedAmount;
        }
    }

    // Remove any applied object from the cart
    removeObjectFromCart(keyValue) {
        this[keyValue] = [];
        this.recalculateCartValues();
    }

    removeProductsFromCart() {
        this.removeObjectFromCart('appliedProducts');
    }

    /////////
    // Tax //
    /////////
    applyTaxToCart(tax) {
        this.appliedTaxes.push(tax);
        // Recalculte values at Cart level
        this.recalculateCartValues();
    }

    removeTaxesFromCart() {
        this.isUntaxed = true;
        this.removeObjectFromCart('appliedTaxes');
    }

    calculateTaxIncludedAmountFromItems() {
        let totalAmount = this.appliedProducts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalValues.itemTaxIncludedAmount,
            0,
        );
        return totalAmount ? totalAmount : 0;
    }

    calculateTaxExcludedAmountFromItems() {
        let totalAmount = this.appliedProducts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.totalValues.itemTaxExcludedAmount,
            0,
        );
        return totalAmount ? totalAmount : 0;
    }

    calculateAmountTaxesFromCart() {
        let totalAmountTax = this.appliedTaxes
            .filter(x => {
                if (x.type == 'amount') return x;
            })
            .reduce((accumulator, currentValue) => accumulator + currentValue.taxAmount, 0);
        if (this.taxIncluded) {
            this.taxIncludedAmount += totalAmountTax && this.appliedProducts.length > 0 ? totalAmountTax : 0;
        } else {
            this.taxExcludedAmount += totalAmountTax && this.appliedProducts.length > 0 ? totalAmountTax : 0;
        }
    }

    //////////////
    // Discount //
    //////////////
    applyDiscountToCart(discount) {
        this.appliedDiscounts.push(discount);
        discount.sort = this.appliedDiscounts.length;
        // Recalculte values at Cart level
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
        // Recalculte values at Cart level
        this.recalculateCartValues();
    }

    removeServiceFeesFromCart() {
        this.removeObjectFromCart('appliedServiceFees');
    }

    ////////////////
    // Item Level //
    ////////////////
    calculateItemTotalValues(product) {
        // General
        product.totalValues = {};
        // Price Calculation
        product.totalValues.totalPrice = product.price * product.quantity;
        product.totalValues.totalItemModifierPrice = this.calculateItemModifierPrice(product) * product.quantity;
        // Tax Calculation
        product.totalValues.itemTaxIncludedAmount = 0;
        product.totalValues.itemTaxExcludedAmount = 0;

        if (!product.isUntaxed) {
            // Type Amount
            let totalItemTaxAmount = product.appliedTaxes
                .filter(x => {
                    if (x.type == 'amount') return x;
                })
                .reduce((accumulator, currentValue) => accumulator + currentValue.taxAmount, 0);
            // Type Percent
            if (product.taxIncluded) {
                // Tax Included or Excluded
                product.totalValues.itemTaxIncludedAmount = totalItemTaxAmount;
            } else {
                product.totalValues.itemTaxExcludedAmount = totalItemTaxAmount;
            }
        }

        // Discount Calculation
        // Type Amount
        // Type Percent

        // Service Fee Calculation
        // Type Amount
        // Type Percent
    }

    applyProductToCart(product, quantity = 1) {
        // Item level
        product.quantity = quantity;
        product.sort = this.appliedProducts.length;
        this.calculateItemTotalValues(product);
        // Add item to the array
        this.appliedProducts.push(product);
        // Recalculte values at Cart level
        this.recalculateCartValues();
    }

    removeProductFromCart(itemID) {
        // Item Level
        this.appliedProducts.splice(itemID, 1);
        // Recalculte values at Cart level
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
        this.appliedProducts[itemID].totalValues.totalItemModifierPrice = this.calculateItemModifierPrice(
            this.appliedProducts[itemID],
        );
        // Recalculte values at Cart level
        this.recalculateCartValues();
    }

    removeModifiersFromItem(itemID) {
        this.appliedProducts[itemID].appliedModifiers = [];
        // Recalculte values at Cart level
        this.recalculateCartValues();
    }

    calculateItemModifierPrice(product) {
        let calculatedValue = product.appliedModifiers.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
            0,
        );
        return calculatedValue ? calculatedValue : 0;
    }

    /////////
    // Tax //
    /////////
    applyTaxToItem(ItemID, tax) {
        this.appliedProducts[ItemID].appliedTaxes.push(tax);
        // Recalculate values at Item level
        this.calculateItemTotalValues(this.appliedProducts[ItemID]);
        // Recalculte values at Cart level
        this.recalculateCartValues();
    }

    removeTaxesFromItem(ItemID) {
        this.appliedProducts[ItemID].appliedTaxes = [];
        this.appliedProducts[ItemID].isUntaxed = true;
        // Recalculate values at Item level
        this.calculateItemTotalValues(this.appliedProducts[ItemID]);
        // Recalculte values at Cart level
        this.recalculateCartValues();
    }

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
