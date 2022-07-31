const mysql= require('mysql');
// 数据库使用连接池
const pool=mysql.createPool({
    connectionLimit : 10,
    host:'localhost',
    user:'root',
    password:'root',
    database:'dorm_manage_system',
    port:3306,
})
module.exports = pool;
