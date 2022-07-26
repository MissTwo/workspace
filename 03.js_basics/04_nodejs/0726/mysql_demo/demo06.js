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
    LastName: '张三',
    City: '深圳'
}
conn.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};
// 执行sql命令
const query = conn.query({
    sql: "select * from persons where LastName = :LastName and City = :City;",
    timeout: 15 * 1000,
}, form, (err, results) => {
    if (err) throw err;
    console.log(results);
});
console.log("当前正在执行的sql命令：", query.sql);

conn.end();