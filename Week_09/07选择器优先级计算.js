function getSpecificity(str, N = 255) {
    let specificityArr = parseStr(str);
    let number = 0;
    let length = specificityArr.length;
    for (let i = 0; i < length; i++) {
        number = number + specificityArr[i] * (N ** (length - i));
    }
    return number;
}
// 只处理了id、类、标签选择器
function parseStr(str) {
    // id 类 标签
    let arr = [0, 0, 0];
    let strArr = str.split('');
    arr[0] = strArr.filter(v => v === '#').length;
    arr[1] = strArr.filter(v => v === '.').length;
    arr[2] = strArr[0]!=='#' && strArr[0]!=='.' ? 1 : 0;
    return arr;
}