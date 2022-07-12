const crypto = require('crypto');

console.log('base64', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));

// Notice
// 현재 sha512로 충분하지만 후에 변경해야할 가능성 있음.
// update => 변경할 문자열
// digest => 알고리즘 (base64, hex, latin1 ...)