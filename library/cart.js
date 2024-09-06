var { randomStringFromTemplate } = require('qansigliere-randomdatagenerators');

class Tax {
    constructor(name, taxRatePercentValue) {
        this.name = name;
        this.taxRatePercentValue = taxRatePercentValue;
        this.taxRate = taxRatePercentValue * 0.01;
    }
}

class Product {
    constructor(
        cost,
        price,
        name,
        quantity = 1,
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
    }
}

class Cart {
    constructor(taxIncluded = false, items = [], appliedTaxes = [], appliedDiscounts = [], appliedServiceFees = []) {
        this.appliedTaxes = appliedTaxes;
        this.taxIncluded = taxIncluded;
        this.items = items;
        this.appliedDiscounts = appliedDiscounts;
        this.appliedServiceFees = appliedServiceFees;
        this.uuid = randomStringFromTemplate('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', '0123456789abcdef');
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
    }
}

module.exports.Tax = Tax;
module.exports.Product = Product;
module.exports.Cart = Cart;
