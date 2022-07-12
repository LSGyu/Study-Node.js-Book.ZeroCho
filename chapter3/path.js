const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('-----------------------------------------------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log('path.basename - extname:', path.basename(string, path.extname(string)));
console.log('-----------------------------------------------------------------------');
console.log('path.parse():', path.parse(string));
console.log('path.format():', path.format({
  dir: 'C://users//zerocho',
  name: 'path',
  ext: 'js',
}));
console.log('path.normalize():', path.normalize('C://users////zerocho///path.js')); // 경로 구분자를 잘못 사용하거나 여러 번 사용했을 경우 정상적인 경로로 변환
console.log('-----------------------------------------------------------------------');
console.log('path.isAbsolute(C://):', path.isAbsolute('C://')); // 절대 경로, 상대 경로 여부를 boolean type으로 반환
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('-----------------------------------------------------------------------');
console.log('path.relative():', path.relative('C://users//zerocho//path.js', 'C://'));
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/zerocho'));
console.log('path.resolve():', path.resolve(__dirname, '..', '/users', '.', '/zerocho'));

// Notice
// 구분자를 두 번 사용한 이유(//): 자바스크립트 문자열에서 의도치 않은 결과가 실행될 수 있음(like. C:/node => /n 은 줄바꿈을 의미)
// 따라서 구분자를 두 번 사용하여 파일 경로 구분자라는 것을 표현한다.

// Node에서 path 모듈을 자주 사용한다.