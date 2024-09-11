class Modifier {
    constructor(price, name) {
        this.price = price;
        this.name = name;
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
    }
}

module.exports.Modifier = Modifier;
