// for (let i = 0; i < 10; i++) {
//     let count = 100;
//     let sudu = Math.ceil(Math.random() * 10 + 1);
//     let name = "t" + i;
//     let s1 = setInterval(function () {
//         count -= sudu;
//         console.log(`${name}选手的速度为${sudu}，还剩${count}米`);
//         if (count <= 0) {
//             console.log(name, "跑完了");
//             clearInterval(s1);
//         }
//     }, 100)
// }

console.log("所有人都跑完了");

const p1 = new Promise((resolve, reject) => {
    resolve("p1");
    // reject("p1失败了")
})
const p2 = new Promise((resolve, reject) => {
    // resolve("p2");
    reject("p2失败了")
})
// Promise.all([p1, p2]).then(results => {
//     //所有promise对象都执行了then才会到这里，results保存所有promise执行结果
//     console.log(results);
// }).catch(err => {
//     //有一个出错了，就到cathc中来了
//     console.log(err);
// })
// Promise.allSettled([p1, p2]).then(results => {
//     // 所有Promise对象都有了反馈，不管是成功还是失败
//     console.log(results);
// }).catch(err => {
//     console.log(err);
// })
// Promise.any([p1, p2]).then(results => {
//     // 只要有一个是成功的，就会进入then
//     console.log(results);
// }).catch(err => {
//     // 所有的都是失败了，就会进入到catch
//     console.log(err);
// })

// 看p1和p2，谁先反馈信息
Promise.race([p1, p2]).then(results => {
    console.log("results:", results);
}).catch(err => {
    console.log("err:", err);
})