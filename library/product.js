class Product {
    constructor(
        price,
        name,
        cost = 0,
        appliedTaxes = [],
        appliedModifiers = [],
        appliedDiscounts = [],
        appliedServiceFees = [],
        isUntaxed = false,
        taxIncluded = false,
    ) {
        this.cost = cost;
        this.price = price;
        this.name = name;
        this.appliedTaxes = appliedTaxes;
        this.appliedModifiers = appliedModifiers;
        this.appliedDiscounts = appliedDiscounts;
        this.appliedServiceFees = appliedServiceFees;
        this.isUntaxed = isUntaxed;
        this.taxIncluded = taxIncluded;
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
    }
}

module.exports.Product = Product;
