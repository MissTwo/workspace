const fs = require("fs");

// 回调地狱，使用同步代码或Promise
fs.readFile("1.txt", "utf-8", function (e1, res1) {
    console.log(res1);
    fs.readFile("2.txt", "utf-8", function (e2, res2) {
        console.log(res2);
        fs.readFile("3.txt", "utf-8", function (e3, res3) {
            console.log(res3);
        });
    });
});

