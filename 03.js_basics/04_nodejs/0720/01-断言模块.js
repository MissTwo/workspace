const assert = require('assert');

assert(1 == 1, "1必须与1相等"); //会中断程序
console.assert(false, 1, 2, 3); //不会阻止程序执行
assert.ok(1 == 1, "1必须与1相等");


function add(a, b) {
    return a + b;
}

// equal使用的==
assert.equal(add(1, 2), 3, "add的执行结果与预期不相符");

// 定义一个对象
let obj = {
    name: "张三111",
    age: 20
}

function t1() {
    return {
        name: "张三",
        age: 20
    }
}

console.log(obj === t1());
assert.deepEqual(t1(), obj, "函数t1的返回值与obj不一致");

console.log("执行完毕");

