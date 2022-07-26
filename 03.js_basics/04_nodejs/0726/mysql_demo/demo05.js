const mysql = require("mysql");
//配置连接
let conn = mysql.createConnection({
    host: 'localhost',
    port: 3306, //3306是默认值
    user: 'root',
    password: 'root',
    database: 'hello'
});
// 执行连接
conn.connect((err, result) => {
    if (err) throw err;
    console.log(result);
});
const form = {
    account: 'admin',
    password: '123'
}
// 执行sql命令
// const query = conn.query({
//     sql: "select * from persons where ?;",
//     timeout: 15 * 1000,
// }, form, (err, results) => {
//     if (err) throw err;
//     console.log(results);
// });
var query = connection.query('INSERT INTO posts SET ?', form, function (error, results, fields) {
    if (error) throw error;
    // Neat!
});
console.log(query.sql);
console.log("当前正在执行的sql命令：", query.sql);

conn.end();