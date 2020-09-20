
function getUTF8Code(str) {
  let codeArr = [];
  for (let i = 0; i < str.length; i++) {
    codeArr.push(str.charCodeAt(i).toString(2));
  }
  return codeArr;
}