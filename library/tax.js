var { normalizeNumberToFixedDigits } = require('./utils.js');

class Tax {
    constructor(name, taxRatePercentValue) {
        this.name = name;
        this.taxRatePercentValue = taxRatePercentValue;
        this.taxRate = normalizeNumberToFixedDigits(taxRatePercentValue * 0.01);
    }
}

module.exports.Tax = Tax;
