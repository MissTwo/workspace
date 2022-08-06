console.log("111111111");
console.log("222222");
console.log("333333");
console.log("44444444");
console.log(a);
// cosole.log(111111);

const $ = require("jquery");
import "./index.css"; // ES6

const btn = document.createElement("button");
$(btn).text("添加div");
$(btn).click(function () {
    const div = document.createElement("div");
    $(div).css("background-color", "green");
    $(div).css("width", "100px");
    $(div).css("height", "100px");
    $("body").append(div);
});
$("body").append(btn);
const input = document.createElement("input");
input.value = "1234567";
$("body").append(input);
if (module.hot) {
    // module.hot.accept();
    console.log("7777777777");
    module.hot.accept("./index.js", function () {
        console.log("66666666666");
        const input1 = document.createElement("input");
        input1.value = "1234567";
        $("body").append(input1);
    });
}
