// import $ from 'jQuery'
// import _ from 'loDash'
import {add} from './math.js'

console.log(add(1, 2));

const btn = document.createElement("button");
btn.onclick = function() {
    console.log("1111111");
    t1()
}
btn.textContent = "按钮"
document.body.appendChild(btn);
function t1() {
    //webpackPrefetch: true
    import(/* webpackChunkName: 'vendor_jquery', webpackPreload: true */"jquery").then(({default: $}) => {
        // console.log(res);
        $("body").append("<div>Jquery Index</div>");
    })

}

// t1();