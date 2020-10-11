
function match(str) {
    for (let v of str) {
        if (v === 'a'){
            return true;
        }
    }
    return false;
}

match('cda');