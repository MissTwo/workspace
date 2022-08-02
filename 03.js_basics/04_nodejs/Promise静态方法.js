// function run() {
//     let arr=[]
//     for (let i = 0; i < 10; i++) {
//         let count = 100;
//         let sudu = Math.ceil(Math.random() * 10 + 1);
//         let name = "t" + i;
//         name = new Promise((resolve, reject) => {
//             let s1=   setInterval(function () {
//                 count -= sudu;
//                 if (count <= 0) {
//                     console.log(`${i}选手的速度为${sudu}，还剩${count}米`);
//                     resolve("跑完了")
//                     clearInterval(s1);
//                 }
//             }, 100)
//             arr.push(name);
//         })
//     }
//     return arr
// }
//
// // console.log("所有人都跑完了");
//
// Promise.all(run()).then(function () {console.log("跑完了")})
// Promise.any(run()).then(function () {console.log("冠军产生了")})

async function t1() {
    await setTimeout(function () {
        console.log(222222)
    }, 10);
    console.log(1111);
}
t1();