class Modifier {
    constructor(price, name, taxFree = false) {
        this.price = price;
        this.name = name;
        this.taxFree = taxFree;
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
    }
}

module.exports.Modifier = Modifier;
