const mysql = require("mysql");
// 连接数据库配置
const pool = mysql.createPool({
    connectionLimit: 10, //默认就是10
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'teach_db_50'
});
// 执行连接
pool.getConnection((err, conn) => {
    // 发送sql命令，并获取结果
    conn.query("select * from sc;", (err, results, fields) => {
        //释放连接，一定要关闭，否则会无限消耗资源
        conn.release();
        if (err) throw err;
        console.log("results：", results);
        // 关闭连接池，一般不写
        // pool.end();
    });
});

pool.getConnection((err, conn) => {
    // 发送sql命令，并获取结果
    conn.query("select * from teacher;", (err, results, fields) => {
        //释放连接，一定要关闭，否则会无限消耗资源
        conn.release();
        if (err) throw err;
        console.log("results：", results);
        // 关闭连接池，一般不写
        // pool.end();
    });
});

pool.query("select * from student", (err, results, fields) => {
    if (err) throw err;
    console.log("results：", results);
})

