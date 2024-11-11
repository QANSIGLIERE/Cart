class Product {
    constructor(
        price,
        name,
        cost = 0,
        appliedTaxes = [],
        appliedModifiers = [],
        appliedDiscounts = [],
        appliedServiceFees = [],
        taxFree = false,
        taxIncluded = false,
    ) {
        this.cost = cost;
        this.price = price;
        this.name = name;
        this.appliedTaxes = appliedTaxes;
        this.appliedModifiers = appliedModifiers;
        this.appliedDiscounts = appliedDiscounts;
        this.appliedServiceFees = appliedServiceFees;
        this.taxFree = taxFree;
        this.taxIncluded = taxIncluded;
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
    }

    applyTax(tax) {
        this.appliedTaxes.push(tax);
        this.updatedDate = new Date().toISOString();
    }

    applyModifier(modifier, quantity = 1) {
        modifier.quantity = quantity;
        modifier.sort = this.appliedModifiers.length;
        this.appliedModifiers.push(modifier);
        this.updatedDate = new Date().toISOString();
    }
}

module.exports.Product = Product;
