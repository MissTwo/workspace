const fs = require("fs"); // 依赖关系更加明确

// 回调函数，异步执行，如果有两个回调函数，那其结果不会以代码的顺序来执行
fs.readFile("1.txt", "utf-8",function (e, res) {
    if (!e) {
        console.log(res);
    } else {
        console.log(e);
    }
})
fs.readFile("2.txt", "utf-8",function (e, res) {
    if (!e) {
        console.log(res);
    } else {
        console.log(e);
    }
})

// 写入文件，会覆盖原来的内容
// fs.writeFile("1.txt", "这是回调函数写的内容", "utf-8",function (e) {
//     if (!e) {
//         console.log("写入成功");
//     } else {
//         console.log(e);
//     }
// })
// 写入文件，附加内容
fs.appendFile("1.txt", "这是回调函数写的内容", "utf-8",function (e) {
    if (!e) {
        console.log("写入成功");
    } else {
        console.log(e);
    }
})

// 创建目录, recursive：true，创建多层级目录
fs.mkdir("a/b/c", { recursive: true }, function (e) {
    if (!e) {
        console.log("创建成功");
    } else {
        console.log(e);
    }
});