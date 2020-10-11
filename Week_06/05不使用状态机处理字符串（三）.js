function match(str) {
    let findA = false;
    let findB = false;
    let findC = false;
    let findD = false;
    let findE = false;
    for (let v of str) {
        if (v === 'a') {
            findA = true;
        } else if (findA && v === 'b') {
            findB = true;
        } else if (findB && v === 'c') {
            findC = true;
        } else if (findC && v === 'd') {
            findD = true;
        } else if (findD && v === 'e') {
            findE = true;
        } else if (findE && v === 'f') {
            return true;
        } else {
            findA = false;
            findB = false;
            findC = false;
            findD = false;
            findE = false;
        }
    }
    return false;
}

match('zxabcdef')