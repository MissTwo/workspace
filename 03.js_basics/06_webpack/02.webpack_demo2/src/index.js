import './index.css'
const $ = require("jquery");
import  text from"./text/1.txt"
import img from"./img/1.jpeg"
import {add,minus} from "./math";
console.log(22);
$('body').append(`<img src=${img}  title=${text}>`)
console.log(add(1,2));
console.log(minus(4,1));
