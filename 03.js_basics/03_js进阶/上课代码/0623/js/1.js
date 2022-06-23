var a = 10;
let res11 = (function (){
    var b = 10;
    var name = "张三";

    // 中间省略1万行
    return {
        b: b,
        name: name,
        say: function () {
            console.log(name)
        }
    }
})()

console.log("res11", res11)