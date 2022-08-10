import $ from 'jquery';
import '../css/index.css';

$('body').append(`<input style='width: 200px; display: block' type="text">`);
$('body').append(`<button type="button" style='width: 100px;'>点我创建盒子</button>`);
$('input[type="text"]').val('12345');
$('button[type="button"]').click(() => {
    $('body').append("<div class='d1'></div>");
});