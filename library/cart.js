var { randomStringFromTemplate } = require('qansigliere-randomdatagenerators');

function normalizeNumberToFixedDigits(initialValue, numberOfDigits = 6) {
    return Number(initialValue.toFixed(numberOfDigits));
}

class Tax {
    constructor(name, taxRatePercentValue) {
        this.name = name;
        this.taxRatePercentValue = taxRatePercentValue;
        this.taxRate = normalizeNumberToFixedDigits(taxRatePercentValue * 0.01);
    }
}

class Product {
    constructor(
        price,
        name,
        quantity = 1,
        cost = 0,
        appliedTaxes = [],
        appliedDiscounts = [],
        appliedServiceFees = [],
        taxIncluded = false,
    ) {
        this.cost = cost;
        this.price = price;
        this.name = name;
        this.quantity = quantity;
        this.appliedTaxes = appliedTaxes;
        this.appliedDiscounts = appliedDiscounts;
        this.appliedServiceFees = appliedServiceFees;
        this.taxIncluded = taxIncluded;
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
        this.orderTaxAmount = 0;
    }
}

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
        this.taxAmount = 0;
        this.totalAmount = 0;
    }

    addItem(product) {
        product['orderTaxAmount'] = this.calculateItemTax(product);
        product['isRemoved'] = false;
        this.items.push(product);
        this.calculateOrderTax();
        this.calculateOrderTotal();
        this.updatedDate = new Date().toISOString();
    }

    removeItem() {
        this.updatedDate = new Date().toISOString();
    }

    calculateItemTax(product) {
        let taxItemValue = 0;
        if (this.appliedTaxes.length > 0) {
            if (this.taxIncluded) {
            } else {
                this.appliedTaxes.forEach(x => (taxItemValue += x['taxRate'] * product['price']));
            }
        }
        return taxItemValue;
    }

    calculateOrderTax() {
        let taxOrderValue = 0;
        this.items.forEach(x => {
            if (!x['isRemoved']) taxOrderValue += x['orderTaxAmount'];
        });
        this.taxAmount = normalizeNumberToFixedDigits(taxOrderValue, 2);
    }

    calculateOrderTotal() {
        let totalAmount = 0;

        if (this.taxIncluded) {
            this.items.forEach(x => {
                if (!x['isRemoved']) totalAmount += normalizeNumberToFixedDigits(x['price'], 2);
            });
        } else {
            this.items.forEach(x => {
                if (!x['isRemoved']) totalAmount += normalizeNumberToFixedDigits(x['price'] + x['orderTaxAmount'], 2);
            });
        }

        this.totalAmount = normalizeNumberToFixedDigits(totalAmount, 2);
    }

    applyDiscountToCart() {
        this.updatedDate = new Date().toISOString();
    }

    applyServiceFeeToCart() {
        this.updatedDate = new Date().toISOString();
    }

    applyDiscountToItem() {}

    applyServiceFeeToItem() {}

    removeTaxesFromCart() {
        this.appliedTaxes = [];
        this.items.forEach(x => {
            x['orderTaxAmount'] = this.calculateItemTax(x);
        });
        this.calculateOrderTax();
        this.calculateOrderTotal();
        this.updatedDate = new Date().toISOString();
    }

    removeTaxFromItem() {}
}

module.exports.Tax = Tax;
module.exports.Product = Product;
module.exports.Cart = Cart;
