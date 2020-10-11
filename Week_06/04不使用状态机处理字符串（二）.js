function match(str) {
    let findA = false;
    for (let v of str){
        if (v === 'a') {
            findA = true;
        } else if (findA && v === 'b') {
            return true;
        } else {
            findA = false;
        }
    }
    return false;
}

match('adas ab')