const url = require('url');
const { URL } = url; // url 모듈 안에서 URL 클래스를 가져와서 사용한다는 의미.
//console.log(url);

const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
//const myURL = new url.URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------------------------------------------------------');
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'); // 주소 분해
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl))

// Notice
// Node 에서 사용하는 주소 처리 방식에는 WHATWG 와 기존 노드 방식 두 가지가 있다.
// host 없이 pathname('/book/bookList.aspx') 만 오는 경우가 있다. 이런 경우 WHATWG 방식으로는 처리 불가하다.