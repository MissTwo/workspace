function t1(c, callback, a, b) {
    console.log("t1开始了", a, b);
    callback()
    console.log("t1结束了")
}

t1(3, function () {
    console.log("回调函数")
}, 1, 2)

const fs = require("fs");
fs.readFile("1.txt", "utf8", function (err, data) {
    fs.readFile("2.txt", "utf8", function (err, data) {
        fs.readFile("3.txt", "utf8", function (err, data) {
            fs.readFile("4.txt", "utf8", function (err, data) {

            })
        })
    })
})
readFileWithPromise("1.txt")
    .then(data => readFileWithPromise("2.txt"))
    .then(data => readFileWithPromise("3.txt"))
    .then(data => readFileWithPromise("4.txt"))

Promise.all([
    readFileWithPromise("1.txt"),
    readFileWithPromise("2.txt"),
    readFileWithPromise("3.txt"),
    readFileWithPromise("4.txt")
]).then(results => {
    console.log(results)
})

async function read() {
    await readFileWithPromise("1.txt")
    await readFileWithPromise("2.txt")
    await readFileWithPromise("3.txt")
    await readFileWithPromise("4.txt")
}


function readFileWithPromise(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", function (err, data) {
            if (err) reject(err);
            resolve(data)
        })
    })
}
