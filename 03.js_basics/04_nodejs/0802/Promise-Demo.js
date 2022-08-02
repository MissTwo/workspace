// resolve, reject就是Promise传出来的对象，给用户使用的
function t1(i) {
    let p1 = new Promise(function (resolve, reject) {
        if(i % 2 == 0) {
            resolve("成功了");
        } else {
            reject("失败了");
        }
    })
    return p1;
}

t1(2).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
})

// 练习：实现一个自定义的promise，处理fs.readfile方法
const fs = require('fs');
// fs.readFile("./1.txt", "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

function readFilePromise(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

readFilePromise("./1.txt").then(data => console.log("data:", data)).catch(err => console.log("err:", err));
// 将数据库中的query方法，改造成支持Promise的方法

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "hello"
})
conn.connect();
// conn.query("select * from persons", (err, results) => {
//     if (err) throw err;
//     console.log(results);
// })

function queryWithPromise(sql) {
    return new Promise(((resolve, reject) => {
        conn.query(sql, (err, results) => {
            if (err) reject(err);
            resolve(results);
        })
    }))
}
// queryWithPromise("select * from persons").then(results => {
//     console.log(results)
// }).catch(err => console.log("err:", err));
// 优雅

function t3() {
    setTimeout(function() {
        console.log("定时代码执行了")
    }, 1000)
}

function t4(i) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (i==2) reject("失败了"); //catch
            resolve("成功了"); //then
            // finally 不管如何都会执行
        }, 1000)
    })
}

t4(1).then(data => {
    console.log("1", data);
    return t4(2);
}).then(data => {
    console.log("2", data)
}).catch(err => {
    console.log(err)
    return t4(2)
}).then(data => {
    console.log("3", data)
}).catch(err => {
    console.log(err)
}).finally(() => {
    console.log("t4结束了")
})

