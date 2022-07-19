const fs = require("fs"); // const定义的是常量，var和let定义是变量

const txt1 = fs.readFileSync("1.txt", "utf8");
console.log(txt1);
const txt2 = fs.readFileSync("2.txt", "utf8");
console.log(txt2);

fs.writeFileSync("4.txt", "这是同步函数写入的内容", "utf8");