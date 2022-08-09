import $ from 'jquery';
$('body').append("<button type='button'>点我打印<button/>").click(() => {
    $('body').append("<div>我是一个新盒子</div>")
})