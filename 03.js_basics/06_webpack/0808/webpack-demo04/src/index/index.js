import $ from 'jquery';
import './index.css';
import '../fonts/iconfont.css';
import index_png from '../images/index.png';
import txt from '../data/1.txt';
import data_json from '../data/data.json';
import data_xml from '../data/data.xml';
import data_yaml from '../data/data.yaml';
import data_toml from '../data/data.toml';
import data_csv from '../data/data.csv';
import data_json5 from '../data/data.json5';
console.log("data_json", data_json);
console.log("data_xml", data_xml);
console.log("data_yaml", data_yaml);
console.log("data_toml", data_toml);
console.log("data_csv", data_csv);
console.log("data_json5", data_json5);
console.log(a);

$("body").append("<div class='d1'>Jquery</div>");

function createImg() {
    const img = document.createElement("img");
    img.src = index_png
    img.title = txt
    document.body.appendChild(img);
}

createImg();