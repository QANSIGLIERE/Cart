class Tax {
    constructor(name, type, amount) {
        this.name = name;
        if (['amount', 'percent'].includes(type)) {
            this.type = type;
        } else {
            throw new Error('The type should be amount or percent');
        }
        if (this.type == 'amount') {
            this.taxRatePercentValue = 0;
            this.taxRate = 0;
            this.taxAmount = amount;
        } else {
            this.taxRatePercentValue = amount;
            this.taxRate = amount * 0.01;
            this.taxAmount = 0;
        }
    }
}

module.exports.Tax = Tax;
