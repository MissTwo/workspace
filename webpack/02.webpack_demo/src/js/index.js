import $ from 'jquery';
import '../css/index.css';

const axios = require('axios');

$('body').append(`<input style='width: 200px; display: block' type="text">`);
$('body').append(`<button type="submit" style='width: 100px;'>点我发起请求</button>`);
$('body').append(`<button type="button" style='width: 100px;'>点我创建盒子</button>`);
$('input[type="text"]').val('12345');
$('button[type="button"]').click(() => {
    $('body').append("<div class='d1'></div>");
});
$('button[type="submit"]').click(() => {
    axios({
        method: 'POST',
        url: '/api/login_check',
        data: {
            account: 'gzwppi',
            password: 'qTtXJK',
            role: 'administrator'
        }
    }).then((results) => {
        console.log(results);
    });

});



