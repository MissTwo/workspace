/*
    sql拼接
 */
const mysql = require("mysql");
// 连接数据库配置
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'hello'
});
// 执行连接
conn.connect();

let id = 1;//这个id是从页面传递过来的
//sql注入攻击
id = "1' or 1='1";
let sql = `delete from persons where P_Id = ${mysql.escape(id)};`;
let name = "张三";
let city = '深圳';
let p_id = 1002;
sql = `update persons set lastname=${mysql.escape(name)}, city=${mysql.escape(city)} where p_id=${mysql.escape(p_id)}`;
sql = `insert into persons set lastname=${mysql.escape(name)}, city=${mysql.escape(city)}`;
// 预编译sql
sql = `insert into persons set lastname=?, city=?`;
console.log(sql);
// throw new Error("");

// 发送sql命令，并获取结果
conn.query(sql, [name, city], (err, results, fields) => {
    if (err) throw err;
    /*
    results： OkPacket {
      fieldCount: 0,
      affectedRows: 1, //影响了多少行数据
      insertId: 0,  // 只在插入数据时有效
      serverStatus: 2,
      warningCount: 0,
      message: '',
      protocol41: true,
      changedRows: 0
    }

     */
    console.log("results：", results);
});

//关闭连接，一定要关闭，否则会无限消耗资源
conn.end();