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

    //////////////////
    // Calculations //
    //////////////////
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

    ////////////////
    // Cart Level //
    ////////////////

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
        product.sort = this.appliedProducts.length;
        // Calculate taxable and non-taxable amounts
        product.calculatedAmount = {};
        product.calculatedAmount['taxableAmount'] = this.calculateItemTaxableAmount(product);
        product.calculatedAmount['nonTaxableAmount'] = this.calculateItemNonTaxableAmount(product);

        // Add item to the array
        this.appliedProducts.push(product);
        // Add change log info
        this.addChange({ action: 'applied a product', entity: product, quantity: quantity });
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
