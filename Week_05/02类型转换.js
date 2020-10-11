function numberToString(number, radix) {
    number = new Number(number);
    return number.toString(radix);
}

function stringToNumber(string, radix) {
    return parseInt(string, radix);
}