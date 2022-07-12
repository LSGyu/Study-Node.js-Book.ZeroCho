const os = require('os');

console.log('운영체제 정보--------------------------------------------------------------------------------');
console.log('os.arch():', os.arch());
console.log('os.platform():', os.platform());
console.log('os.type():', os.type()); //운영체제 종류
console.log('os.uptime():', os.uptime()); //부팅 후 시간
console.log('os.hostname():', os.hostname());
console.log('os.release():', os.release()); //운영체제 버전

console.log('경로----------------------------------------------------------------------------------------');
console.log('os.homedir():', os.homedir());
console.log('os.tmpdir():', os.tmpdir());

console.log('CPU 정보------------------------------------------------------------------------------------');
console.log('os.cpus():', os.cpus()); // 코어 정보
console.log('os.cpus().length:', os.cpus().length);

console.log('메모리 정보---------------------------------------------------------------------------------');
console.log('os.freemem():', os.freemem()); // 사용가능한 램(RAM)
console.log('os.totalmem():', os.totalmem()); // 전체 메모리 용량

