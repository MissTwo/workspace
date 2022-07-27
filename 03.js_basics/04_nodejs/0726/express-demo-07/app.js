const express = require('express');
const app = express();
const bodyParser = require('body-parser')
//extended，决定使用哪个库来解析一个querystring(false)或qs(true)
app.use(bodyParser.urlencoded({ extended: true }))
const mysql = require("mysql");
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dorm_manage_system'
})
conn.connect();

/**
 * 查询所有用户信息
 */
app.get("/persons", (req, res) => {
    conn.query("select * from dorms;", (err, results) => {
        if (err) throw err;
        res.json(results);
    })
})

app.get("/persons/deleteById", (req, res) => {
    const id = req.query.id;
    conn.query("delete from dorms where id = ?;", [id], (err, results) => {
        if (err) throw err;
        res.send(results.affectedRows > 0 ? "删除成功" : "删除失败");
    })
})

app.get("/persons/getById", (req, res) => {
    const id = req.query.id;
    conn.query("select * from dorms where id = ?;", [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    })
})

app.post("/persons/update", (req, res) => {
    console.log("1111", req.body);
    const id = req.body.id;
    delete req.body.id;
    const query = conn.query("update persons set ? where id = ?;", [req.body, id], (err, results) => {
        if (err) throw err;
        res.send(results.affectedRows > 0 ? "更新成功" : "更新失败");
    });
    console.log("当前正在执行的sql命令：", query.sql);
})

app.post("/persons/insert", (req, res) => {
    // insert into persons set 列名=值, 列名=值.
    console.log("2222", req.body);
    const query = conn.query("insert into dorms set ? ;", req.body, (err, results) => {
        if (err) throw err;
        res.send(results.affectedRows > 0 ? "添加成功" : "添加失败");
    });
    console.log("当前正在执行的sql命令：", query.sql);
})

app.listen(3000);