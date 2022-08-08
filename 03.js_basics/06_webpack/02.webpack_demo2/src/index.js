import './index.css'
const $ = require("jquery");
import  text from"./text/1.txt"
import img from"./img/1.jpeg"
console.log(22);
$('body').append(`<img src=${img}  title=${text}>`)
