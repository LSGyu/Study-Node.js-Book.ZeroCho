setImmediate(() => {
  console.log('immediate');
});
process.nextTick(() => {
  console.log('nextTick');
});
setTimeout(() => {
  console.log('timeout');
}, 0);
Promise.resolve().then(() => console.log('promise'));

// 태스크 큐 => setInterval, setTimeout, http.get ...
// 마이크로태스크 큐 => process.nextTick, Promise ... (process.nextTick 가장 먼저 실행된다.)
// 마이크로태스크 큐가 태스크 큐보다 먼저 실행