const { odd, evne, even } = require('./var');
const checkNumber = require('./func');

let checkStringOddOrEven = (str) => {
  if ( str.length % 2 ) { // 나머지가 1이면 true, 0 이면 false 
    return odd;
  } else {
    return even;
  }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));