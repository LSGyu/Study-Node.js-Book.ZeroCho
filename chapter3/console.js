const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: 'value',
    },
  },
};

console.time('전체 시간');
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담아주세요.');

console.table([{ name: '제로', birth: 1994 }, { name: 'hero', birth: 1988 }]);

console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

console.time('시간 측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간 측정');

let b = () => {
  console.trace('에러 위치 추적');
}
let a = () => {
  b();
}
a();
console.timeEnd('전체 시간');

// Notice
// console.time 이나 console.trace 의 경로는 사용자의 컴퓨터 환경에 따라 다를 수 있다.
// 편리한 디버깅을 위해 console 객체에는 지금도 새로운 메서드들이 추가되고 있다.
// 더 다양한 console 객체의 메서드들이 있다.