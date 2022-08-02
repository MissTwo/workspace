// 创建10个Promise对象，然后放到一个数组中
const a1 = [];
let is_over = false; // 比赛是否结束

for (let i = 0; i < 10; i++) {
    const p = new Promise((resolve, reject) => {
        let count = 100;
        let sudu = Math.ceil(Math.random() * 10 + 1);
        let name = "t" + i;
        let s1 = setInterval(function () {
            count -= sudu;
            console.log(`${name}选手的速度为${sudu}，还剩${count}米`);
            if (count <= 0) {
                // console.log(name, "跑完了");
                resolve(`${name}跑完了`);
                clearInterval(s1);
            }
        }, 100)
    });
    a1.push(p);
}

a1[5] = Promise.reject("第6个选手，弃权了");
//就算有一个弃权了，其他还是会比赛，但最终的结果在catch中
// Promise.all(a1).then(results => {
//     console.log(results)
// }).catch(err => {
//     console.log("err", err);
// })
//就算有一个弃权了，其他还是会比赛，但最终的结果在then中
// Promise.allSettled(a1).then(results => {
//     console.log(results)
// }).catch(err => {
//     console.log("err", err);
// })
// 只要有一个结果兑现了，那么就触发then
// Promise.any(a1).then(results => {
//     console.log(results)
// }).catch(err => {
//     console.log("err", err);
// })
// 只要有一个结果出现了，不管是兑现还是失败，都会触发then或catch
Promise.race(a1).then(results => {
    console.log(results)
}).catch(err => {
    console.log("err", err);
})
