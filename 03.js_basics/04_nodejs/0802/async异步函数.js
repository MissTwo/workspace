//同步函数
function t1() {
    console.log("t1");
}

const fs = require("fs");
// 异步函数
async function t2(filename) {
    console.log("t2", filename);
    console.log("t2", filename);
    console.log("t2", filename);
    console.log("t2", filename);
    console.log("t2", filename);
    console.log("t2", filename);
    console.log("t2", filename);

    return fs.readFileSync(filename, "utf8");
}

console.log("--------------2----------------")
t2("2.txt").then(result => {
    console.log("1", result);
})
t2("1.txt").then(result => {
    console.log("2", result);
})

async function t3() {
    console.log("t3开始了")
    const data1 = await fs.promises.readFile("2.txt", "utf8");
    console.log("data1", data1);
    const data2 = await fs.promises.readFile("1.txt", "utf8");
    console.log("data2",data2);
    console.log("t3执行完了")
}

console.log("--------------1----------------")
t3();