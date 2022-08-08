import $ from 'jquery';
import './index.css';
import index_png from './images/index.png';
import txt from './data/1.txt';

$("body").append("<div class='d1'>Jquery</div>");

function createImg() {
    const img = document.createElement("img");
    img.src = index_png
    img.title = txt
    document.body.appendChild(img);
}

createImg();