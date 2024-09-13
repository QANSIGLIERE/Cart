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
        let orderAppliedTaxed = this.calculateOrderAppliedTaxes();
        return (
            product['itemPriceAmount'] *
            (product['itemTaxRate'] + orderAppliedTaxed && !product['isUntaxed'] ? orderAppliedTaxed : 0)
        );
    }

    addItem(product, quantity = 1) {
        // Item level
        product['quantity'] = quantity;
        product['itemPriceAmount'] = this.calculateItemPrice(product, quantity);
        product['itemTaxRate'] = this.calculateItemTaxRate(product);
        product['itemTaxAmount'] = this.calculateItemTax(product);
        product['isRemoved'] = false;
        product['sort'] = this.items.length;
        this.items.push(product);
        // Order Level
        this.recalculateOrderValues();
    }

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
        this.recalculateOrderValues();
    }

    removeItem() {
        // Item Level

        // Order Level
        this.recalculateOrderValues();
    }

    applyDiscountToCart() {
        this.updatedDate = new Date().toISOString();
    }

    applyServiceFeeToCart() {
        this.updatedDate = new Date().toISOString();
    }

    applyDiscountToItem() {}

    applyServiceFeeToItem() {}

    // Calculate Order Applied Taxes
    calculateOrderAppliedTaxes() {
        let orderAppliedTaxes = this.appliedTaxes.reduce(
            (accumulator, currentValue) => accumulator + currentValue['taxRate'],
            0,
        );
        return orderAppliedTaxes ? orderAppliedTaxes : 0;
    }

    // Order Total Amount
    calculateOrderTotalAmount() {
        let totalItemsPrices = this.items.reduce(
            (accumulator, currentValue) => accumulator + currentValue['itemPriceAmount'],
            0,
        );
        this.totalAmount = totalItemsPrices ? totalItemsPrices : 0;
    }

    // Items without additional taxes
    calculateTotalAmountOfProductsWithoutAdditionalTaxes() {
        let totalPriceAmount = this.items
            .filter(x => !x['isUntaxed'] && x['appliedTaxes'].length == 0)
            .reduce((accumulator, currentValue) => accumulator + currentValue['itemPriceAmount'], 0);
        return totalPriceAmount ? totalPriceAmount : 0;
    }

    // Order Total Tax Amount
    calculateOrderTaxAmount() {
        let orderAppliedTaxed = this.calculateOrderAppliedTaxes();
        let totalAmountOfProductsWithoutAdditionalTaxes = this.calculateTotalAmountOfProductsWithoutAdditionalTaxes();
        let taxAmountFromProductsWithAdditionalTaxes = this.items
            .filter(x => !x['isUntaxed'] && x['appliedTaxes'].length > 0)
            .reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue['itemPriceAmount'] * (currentValue['itemTaxRate'] + orderAppliedTaxed),
                0,
            );
        let totalTaxes =
            totalAmountOfProductsWithoutAdditionalTaxes * orderAppliedTaxed + taxAmountFromProductsWithAdditionalTaxes;

        this.totalTaxAmount = totalTaxes ? totalTaxes : 0;
    }

    calculateFinalTotalAmount() {
        this.finalTotalAmount = this.totalTaxAmount + this.totalAmount;
    }

    // Order Level Operations
    recalculateOrderValues() {
        this.calculateOrderTotalAmount();
        this.calculateOrderTaxAmount();
        this.calculateFinalTotalAmount();
        this.updatedDate = new Date().toISOString();
    }

    // Remove taxed from the cart
    removeTaxesFromCart() {
        this.appliedTaxes = [];
        this.recalculateOrderValues();
    }
}

module.exports.Cart = Cart;
