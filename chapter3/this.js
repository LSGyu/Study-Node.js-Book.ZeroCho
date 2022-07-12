console.log(this);
console.log(this === module.exports);
console.log(this === exports)
// let whatIsThis = () => {
//   console.log('function', this === exports, this === global);
// }; // 'function' true false (this => 상위 스코프의 this === module.exports)
function whatIsThis() {
  console.log('function', this === exports, this === global);
}; // 'funtion' false true (this => 함수 스코프의 this === global)
whatIsThis();

// 화살표 함수의 this 는 상위 스코프의 this 이다.
// 일반 함수의 this 는 함수 스코프의 this 이다.