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

// 执行sql命令
conn.query({
    sql: "select * from persons where p_id = ?;",
    timeout: 15 * 1000,
    values: [1]
}, (err, results) => {
    if (err) throw err;
    console.log(results[0].LastName);
});

conn.end();

conn = mysql.createConnection({
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

// 执行sql命令
conn.query({
    sql: "select * from persons where p_id = ?;",
    timeout: 15 * 1000,
}, [2], (err, results) => {
    if (err) throw err;
    console.log(results[0].LastName);
});

conn.end();