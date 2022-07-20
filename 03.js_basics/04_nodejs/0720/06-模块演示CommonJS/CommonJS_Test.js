const a = 10;

const obj = {
    name: "张三",
    age: 20
}

function add(a, b) {
    return a + b;
}

const b = 10;

// 控制该模块的导出内容
module.exports = {
    // a: a, ES5必须这样，
    a, // ES6提供
    obj,
    add
}