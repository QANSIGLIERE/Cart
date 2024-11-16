function normalizeNumberToFixedDigits(initialValue, numberOfDigits = 6) {
    return Number(initialValue.toFixed(numberOfDigits));
}

//////////
// Sort //
//////////
function sort(array) {
    if (array.length == 0) {
        return array.length;
    } else {
        return Math.max(...array) + 1;
    }
}

module.exports.normalizeNumberToFixedDigits = normalizeNumberToFixedDigits;
module.exports.sort = sort;
