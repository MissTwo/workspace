const path = require('path');

console.log(path.join(__dirname, "a"))
console.log(path.join(__dirname, "./a"))
console.log(path.join(__dirname, "../a"))
console.log(path.join(__dirname, "../a", "b"))
console.log(path.join(__dirname, "../a", "b", "1.txt"))

console.log("----------------------------------------")
let p = "D:\\Program Files\\nvm";
console.log(path.basename(p));
console.log(path.basename(__filename));
console.log(path.dirname(__filename));// __dirname
console.log(path.dirname(p));// 取上一级目录的路径
console.log(path.extname(__filename));
console.log(path.isAbsolute(__filename));
console.log(path.isAbsolute("a"));
console.log("----------------------------------------")

console.log(path.resolve(__dirname, "a"))
console.log(path.resolve(__dirname, "./a"))
console.log(path.resolve(__dirname, "../a"))
console.log(path.resolve(__dirname, "../a", "b"))
console.log(path.resolve(__dirname, "../a", "b", "1.txt"))
