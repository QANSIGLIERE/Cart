var { randomStringFromTemplate } = require('qansigliere-randomdatagenerators');

class Cart {
    constructor(
        appliedTaxes,
        taxIncluded = false,
        items = [],
        appliedDiscounts = [],
        appliedServiceFees = [],
        isClosed = false,
        currency = '$',
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
        this.currency = currency;
    }

    ////////////////
    // Cart Level //
    ////////////////
    recalculateCartValues() {
        this.calculateCartTotalAmount();
        this.calculateCartTaxAmount();
        this.calculateFinalTotalAmount();
        this.updatedDate = new Date().toISOString();
    }

    calculateFinalTotalAmount() {
        if (this.taxIncluded) {
            this.finalTotalAmount = this.totalAmount;
        } else {
            this.finalTotalAmount = this.totalTaxAmount + this.totalAmount;
        }
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
        this.removeObjectFromCart('appliedTaxes');
    }

    //////////////
    // Discount //
    //////////////
    applyDiscountToCart(discount) {
        this.appliedDiscounts.push(discount);
        discount.sort = this.appliedDiscounts.length;
        // Order Level
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
        // Order Level
        this.recalculateCartValues();
    }

    removeServiceFeesFromCart() {
        this.removeObjectFromCart('appliedServiceFees');
    }

    ////////////////
    // Item Level //
    ////////////////
    addItemToCart() {}

    removeItemFromCart() {}

    changeQuantityForItem() {}

    //////////////
    // Modifier //
    //////////////
    applyModifierToItem() {}

    removeModifiersFromItem() {}

    /////////
    // Tax //
    /////////
    applyTaxToItem() {}

    // Remove all taxes from any specific item in the cart
    removeTaxesFromItem(itemId) {
        // Item Level
        this.items[itemId]['isUntaxed'] = true;
        this.items[itemId]['appliedTaxes'] = [];
        this.items[itemId]['itemPriceAmount'] = this.calculateItemPrice(
            this.items[itemId],
            this.items[itemId]['quantity'],
        );
        this.items[itemId]['itemTaxRate'] = this.calculateItemTaxRate(this.items[itemId]);
        this.items[itemId]['itemTaxAmount'] = this.calculateItemTax(this.items[itemId]);
        // Order Level
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

    // Item Modifiers Prices Calculation
    calculateItemModifiersPrices(product) {
        let itemModifierPrices = product.appliedModifiers.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
            0,
        );
        return itemModifierPrices ? itemModifierPrices : 0;
    }

    // Item Price Calculation
    calculateItemPrice(product, quantity) {
        return (product.price + this.calculateItemModifiersPrices(product)) * quantity;
    }

    // Item Tax Rate Calculation
    calculateItemTaxRate(product) {
        let itemTaxRate = product.appliedTaxes.reduce(
            (accumulator, currentValue) => accumulator + currentValue.taxRate,
            0,
        );
        return itemTaxRate && !product.isUntaxed ? itemTaxRate : 0;
    }

    // Item Tax Calculation
    calculateItemTax(product) {
        let orderAppliedTaxed = this.calculateOrderAppliedTaxes();
        return (
            product.itemPriceAmount *
            (product.itemTaxRate + orderAppliedTaxed && !product.isUntaxed ? orderAppliedTaxed : 0)
        );
    }

    addItem(product, quantity = 1) {
        // Item level
        product.quantity = quantity;
        product.itemPriceAmount = this.calculateItemPrice(product, quantity);
        product.itemTaxRate = this.calculateItemTaxRate(product);
        product.itemTaxAmount = this.calculateItemTax(product);
        product.isRemoved = false;
        product.sort = this.items.length;
        this.items.push(product);
        // Order Level
        this.recalculateCartValues();
    }

    removeItem(itemId) {
        // Item Level
        this.items.splice(itemId, 1);
        // Order Level
        this.recalculateCartValues();
    }

    // Calculate Order Applied Taxes
    calculateOrderAppliedTaxes() {
        let orderAppliedTaxes = this.appliedTaxes.reduce(
            (accumulator, currentValue) => accumulator + currentValue.taxRate,
            0,
        );
        return orderAppliedTaxes ? orderAppliedTaxes : 0;
    }

    // Order Total Amount
    calculateCartTotalAmount() {
        let totalItemsPrices = this.items.reduce(
            (accumulator, currentValue) => accumulator + currentValue.itemPriceAmount,
            0,
        );
        this.totalAmount = totalItemsPrices ? totalItemsPrices : 0;
    }

    // Items without additional taxes
    calculateTotalAmountOfProductsWithoutAdditionalTaxes() {
        let totalPriceAmount = this.items
            .filter(x => !x.isUntaxed && x.appliedTaxes.length == 0)
            .reduce((accumulator, currentValue) => accumulator + currentValue.itemPriceAmount, 0);
        return totalPriceAmount ? totalPriceAmount : 0;
    }

    // Order Total Tax Amount
    calculateCartTaxAmount() {
        let orderAppliedTaxed = this.calculateOrderAppliedTaxes();
        let totalAmountOfProductsWithoutAdditionalTaxes = this.calculateTotalAmountOfProductsWithoutAdditionalTaxes();
        let taxAmountFromProductsWithAdditionalTaxes = this.items
            .filter(x => !x.isUntaxed && x.appliedTaxes.length > 0)
            .reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue.itemPriceAmount * (currentValue.itemTaxRate + orderAppliedTaxed),
                0,
            );
        let totalTaxes =
            totalAmountOfProductsWithoutAdditionalTaxes * orderAppliedTaxed + taxAmountFromProductsWithAdditionalTaxes;

        this.totalTaxAmount = totalTaxes ? totalTaxes : 0;
    }
}

module.exports.Cart = Cart;
