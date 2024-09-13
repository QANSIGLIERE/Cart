function normalizeNumberToFixedDigits(initialValue, numberOfDigits = 6) {
    return Number(initialValue.toFixed(numberOfDigits));
}

module.exports.normalizeNumberToFixedDigits = normalizeNumberToFixedDigits;
