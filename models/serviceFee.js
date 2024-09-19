class ServiceFee {
    constructor(name, type, value, isTaxable = false) {
        this.name = name;
        if (['amount', 'percent'].includes(type)) {
            this.type = type;
        } else {
            throw new Error('The type should be amount or percent');
        }
        this.value = value;
        this.isTaxable = isTaxable;
        this.createdDate = new Date().toISOString();
        this.updatedDate = new Date().toISOString();
    }
}

module.exports.ServiceFee = ServiceFee;
