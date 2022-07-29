/**
 *  数据连接模块
 */

const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: "cdw100"
});

module.exports = pool;