const express = require('express');
const app = express();
// const path = require('path');
// const fs=require('fs')
// const multer=require('multer')
// 配置保存目录
// const subFolder='uploads'
// const upload_folder=path.join("public",subFolder)


// // 跨域
// const cors= require('cors');
// app.use(cors());
//
// // 静态资源的处理
// app.use(express.static(path.join(__dirname, 'public')))
//
// // session的配置
// const session= require('express-session');
//
// // 参数的配置
// app.use(session({
//     // 作为服务器端生成session的签名
//     secret: 'keyboard cat',
//     // 保存在本地cookie的一个名字，默认connect.sid可以不设置
//     name: 'session_id',
//     // 强制保存session即使他并没有变化
//     resave: false,
//     // 强制将未初始化的session存储
//     saveUninitialized: true,
//     cookie: {
//         // 设置最大时间，过期时间
//         maxAge: 3600 * 24
//     },
//     // 重置过期时间
//     rolling: true
// }));
//
// // token标识
// // 1.导入用于生成JWT字符串的包
// const jwt = require('jsonwebtoken');
// // 2.导入用于将客户端发过来的jwt字符串，解析还原成json对象的包
// const {expressjwt} = require('express-jwt');
// // 3.secret一个密钥字符串
// const secretKey="manager key";
//
// // 配置中间件：如果请求中没有token就不通过，白名单需要要token可通过
// app.use(expressjwt({
//     secret: secretKey,
//     algorithms: ['HS256'],
//
// }))
//
// // 自定义中间件，统一参数打印
// app.use(function (req, res, next) {
//     // req.query :保存get请求参数对象
//     // req.body:保存post请求参数对象
//     console.log(req.url,req.method,req.query,req.body)
//     next();
// })
// app.post('/', (req, res) => {
//     res.send("这是用户登录页");
// })
// app.get('/api', (req, res) => {
//     res.json({success: true, message: '请求成功了哦'})
// })
// // 加密操作
// const bcrypt=require('bcryptjs')
// // 设置加密等级，默认最高10级
// const salt = bcrypt.genSaltSync(password,salt)
// console.log("salt:", salt)
// const password = "123";
// const password_hash = "$2a$10$CYu9yOyYrtVUrECPMmVljO2QGjUxrH2wD2/c9YkQnEG5kZgSOtXCm";
// const hash = bcrypt.hashSync(password, salt);
// console.log("hash：", hash);
// //比较原密码和加密之后内容
// console.log(bcrypt.compareSync(password, hash));
// console.log(bcrypt.compareSync(password, password_hash));

// 数据库的连接方法一：
// const mysql= require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     post:3306,
//     user: 'root',
//     password: 'root',
//     database: 'dorm_manage_system',
// });
// connection.connect();
// connection.query('SELECT * FROM dorms',function (err, result, fields) {
//     if(err) throw err;
//     console.log("result: ", result);
// })
// connection.end();

// 连接池的使用一：
// const mysql= require('mysql');
// const pool = mysql.createPool({
//     connectionLimit:5,
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'dorm_manage_system',
// })
// // 增：
// let i=insert into dorm_manage_system.dorms (id,name,introduce)  values (0,"222","333")
// let i=insert into dorm_manage_system.dorms values (?,?,?)
// // 删：
// let d=delete from dorm_manage_system.dorms where id = ?
// // 改：
// let u=update dorm_manage_system.dorms set introduce = ?
// // 查：
// let s=select * from dorm_manage_system.dorms

// pool.getConnection(function(err, connection) {
//     if(err) throw err;
//     connection.query('update dorm_manage_system.dorms set introduce = ? where id = ?',["呼啦啦",7],function (err, result, fields) {
//         console.log("result: ", result)
//         connection.release();
//     })
// })

// 连接池的使用二：

app.post('/api', (req, res) => {
    const  mysql=require('mysql');
    const pool=mysql.createPool({
        connectionLimit:10,
        host: 'localhost',
        user: 'root',
        password:'root',
        database:'dorm_manage_system'
    });
    // const baseSql='select a.*,d.name dorm_name from dorm_admins a left join dorms d on a.dorm_id=d.id where a.id= ? ;'
    // pool.query(baseSql,[1],function(err, results) {
    //     if (err) throw err;
    //     if(results.affectedRows > 0){
    //         res.json({code:0,message:"success",data:result});
    //     }else{
    //         res.json({code:1,message:"failure"});
    //     }
    // })
    let id=1;
    let msql='SELECT a.*,d.name dorm_name FROM dorm_admins a LEFT JOIN dorms d ON a.dorm_id=d.id where a.id= ?'
    pool.query(msql,[id], (err, result) => {
        if (err) throw err;
        res.json({code:0,message:"success",data:result});
        console.log(1111111,result.affectedRows)

        // if(result.affectedRows > 0){
        //             res.json({code:0,message:"success",data:result});
        //         }else{
        //             res.json({code:1,message:"failure"});
        //         }
    })
})
// app.get('/users',(req, res) => {
//     const mysql=require('mysql');
//     const poo
// })

// 统一错误处理
// app.use((req, res)=> {
//     res.status(404).json({success: false,message:'请求错误，失败了'})
// })
app.listen(3000,function(){
    console.log('http://localhost:3000')
});
