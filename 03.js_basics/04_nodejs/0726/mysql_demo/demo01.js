const mysql = require("mysql");
// 连接数据库配置
const conn = mysql.createConnection({
   host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'teach_db'
});
// 执行连接
conn.connect();

// 发送sql命令，并获取结果
conn.query("select * from emp;", (err, results, fields) => {
    if (err) throw err;
    console.log("results：", results);
});

// 发送sql命令，并获取结果
conn.query("select * from dept;", (err, results, fields) => {
    if (err) throw err;
    console.log("results：", results);
});

//关闭连接，一定要关闭，否则会无限消耗资源
conn.end();