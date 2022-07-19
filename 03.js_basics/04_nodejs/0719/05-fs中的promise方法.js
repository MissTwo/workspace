// const fs_promise = require('fs/promise');
const fs = require('fs');
const fs_promise = fs.promises;

fs_promise.readFile("1.txt", "utf8")
    .then((res) => {
        console.log(res)
        return fs_promise.readFile("2.txt", "utf8");
    }).then((res) => {
        console.log(res)
        return fs_promise.readFile("3.txt", "utf8");
    }).then(res => console.log(res))
    .catch(e => console.log(e));

// fs_promise.readFile("2.txt", "utf8").then((res) => {
//     console.log(res)
// }).catch(e => console.log(e));