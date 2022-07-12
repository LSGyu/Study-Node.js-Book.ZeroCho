const crypto = require('crypto');

const algorithm = 'aes-256-cbc'; // key => 32byte, iv => 16byte
const key = 'abcdefghijklmnopqrstuvwxyz123456'; 
const iv = '1234567890123456';
const cipher = crypto.createCipheriv(algorithm, key, iv);
let result_cipher = cipher.update('암호화할 문장', 'utf-8', 'base64');
result_cipher += cipher.final('base64');
console.log('암호화:', result_cipher);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result_decipher = decipher.update(result_cipher, 'base64', 'utf-8');
result_decipher += decipher.final('utf-8');
console.log('복호화:', result_decipher);
