//同步代码，异步代码（宏和微）
console.log(1);//同步代码
// 产生一个宏任务，放到宏任务的执行队列中
// 会产生宏任务，setTimeout、setInterval、UI更新(dom操作)，setImmediate()
setTimeout(function() {
    console.log(2)
}, 0) // 不支持0，最小是1ms
// 产生一个微任务，放到微任务的执行队列中
// 在JS中微任务比宏任务先执行
new Promise((resolve, reject) => {
    console.log(5) //同步代码
    resolve(3)
}).then(data => console.log(data)) // then中产生是微任务
console.log(4);//同步代码
