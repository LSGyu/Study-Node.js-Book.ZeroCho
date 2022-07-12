const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt:', salt);
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password:', key.toString('base64'));
  });
});

// Notice
// pbkdf2 는 노드에서 지원하는 알고리즘으로
// 변환 알고리즘에 salt를 문자열에 추가 후 변환하는 과정을 지정한 횟수만큼 진행하는 것입니다.
// bcrypt 나 scrypt 가 더 높은 보안성을 가짐.