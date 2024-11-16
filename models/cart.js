var { randomStringFromTemplate } = require('qansigliere-randomdatagenerators');
var { sort } = require('./utils.js');

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
        this.taxFree = false;
        this.changeLog = [];
        this.totalAmount = 0;
        this.finalTotalAmount = 0;
        this.totalTaxAmount = 0;
    }

    ////////////////
    // Change Log //
    ////////////////
    addChange(obj) {
        this.changeLog.push(obj);
        this.updatedDate = new Date().toISOString();
    }

    //////////////////////////////////////////////
    // Calculate Taxable and Non-Taxable Amount //
    //////////////////////////////////////////////
    calculateItemTaxableAmount(product) {
        if (!product.taxFree) {
            let calculatedAmount = product.appliedModifiers
                .filter(x => !x.taxFree)
                .reduce(
                    (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
                    product.price,
                );

            return calculatedAmount * product.quantity ? calculatedAmount * product.quantity : 0;
        } else return 0;
    }

    calculateItemNonTaxableAmount(product) {
        if (product.taxFree) {
            let calculatedAmount = product.appliedModifiers.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
                product.price,
            );

            return calculatedAmount * product.quantity ? calculatedAmount * product.quantity : 0;
        } else {
            let calculatedAmount = product.appliedModifiers
                .filter(x => x.taxFree)
                .reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);

            return calculatedAmount * product.quantity ? calculatedAmount * product.quantity : 0;
        }
    }

    /////////////////////////////////
    // Calculate Item Amount Taxes //
    /////////////////////////////////
    calculateItemAmountTaxes(product) {
        if (product.taxFree) {
            return 0;
        } else {
            let orderAmountTaxes = this.appliedTaxes
                .filter(x => x.type == 'amount')
                .reduce((accumulator, currentValue) => accumulator + currentValue.taxAmount, 0);
            let itemAmountTaxes = product.appliedTaxes
                .filter(x => x.type == 'amount')
                .reduce((accumulator, currentValue) => accumulator + currentValue.taxAmount, 0);
            return (
                ((orderAmountTaxes ? orderAmountTaxes : 0) + (itemAmountTaxes ? itemAmountTaxes : 0)) * product.quantity
            );
        }
    }

    ////////////////
    // Cart Level //
    ////////////////
    calculateTotalTaxAmount() {
        this.totalTaxAmount = this.appliedProducts.reduce(
            (accumulator, currentValue) =>
                accumulator +
                currentValue.calculatedAmount.taxIncludedTaxAmount +
                currentValue.calculatedAmount.taxExcludedTaxAmount,
            0,
        );
    }

    calculateTotalAmount() {
        this.totalAmount = this.appliedProducts.reduce(
            (accumulator, currentValue) =>
                accumulator +
                currentValue.calculatedAmount.taxableAmount +
                currentValue.calculatedAmount.nonTaxableAmount,
            0,
        );
    }

    // Remove any applied object from the cart
    removeObjectFromCart() {}

    removeProductsFromCart() {}

    /////////
    // Tax //
    /////////
    applyTaxToCart() {}

    removeTaxesFromCart() {}

    //////////////
    // Discount //
    //////////////
    applyDiscountToCart() {}

    removeDiscountsFromCart() {}

    /////////////////
    // Service Fee //
    /////////////////
    applyServiceFeeToCart() {}

    removeServiceFeesFromCart() {}

    ////////////////
    // Item Level //
    ////////////////
    applyProductToCart(product, quantity = 1) {
        // Item level
        product.quantity = quantity;
        product.sort = sort(this.appliedProducts.map(x => x.sort));
        // Calculate taxable and non-taxable amounts
        product.calculatedAmount = { taxIncludedTaxAmount: 0, taxExcludedTaxAmount: 0 };
        product.calculatedAmount['taxableAmount'] = this.calculateItemTaxableAmount(product);
        product.calculatedAmount['nonTaxableAmount'] = this.calculateItemNonTaxableAmount(product);
        if (product.taxIncluded) {
            product.calculatedAmount['taxIncludedTaxAmount'] = this.calculateItemAmountTaxes(product);
        } else {
            product.calculatedAmount['taxExcludedTaxAmount'] = this.calculateItemAmountTaxes(product);
        }
        // Add item to the array
        this.appliedProducts.push(product);
        // Calculate cart level amount
        this.calculateTotalTaxAmount();
        this.calculateTotalAmount();
        // Add change log info
        this.addChange({ action: 'applied a product', entity: product });
    }

    removeProductFromCart() {}

    changeQuantityForItem() {}

    //////////////
    // Modifier //
    //////////////
    applyModifierToItem() {}

    removeModifiersFromItem() {}

    calculateItemModifierPrice() {}

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
