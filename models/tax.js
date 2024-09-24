var { normalizeNumberToFixedDigits } = require('./utils.js');

class Tax {
    constructor(name, taxRatePercentValue, fixedValue = 0) {
        this.name = name;
        this.taxRatePercentValue = taxRatePercentValue;
        this.taxRate = normalizeNumberToFixedDigits(taxRatePercentValue * 0.01);
        this.fixedValue = fixedValue;
    }
}

module.exports.Tax = Tax;
