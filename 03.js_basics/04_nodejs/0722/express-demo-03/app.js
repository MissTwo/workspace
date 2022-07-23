const express = require('express');
const app = express();
const path = require('path');

// 支持跨域
const cors = require('cors');
app.use(cors());


// 解决跨域问题
// 1.下载包
// npm install cors
// 2.配置之间件
// var cors = require('cors');
// app.use(cors());
// 3.cors中间件层原理
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// })


// 静态资源的加载，写在路由的前面
app.use(express.static(path.join(__dirname, 'public')))

// 统一参数打印
app.use((req, res, next) => {
    console.log(req.url, req.query, req.body);
    next(); // 放行函数
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
    // res.send()或end()，需要使用fs模块来读取
})

app.get('/json.html', (req, res) => {
    res.json({
        message: "访问成功"
    })
})

app.get('/user.html', (req, res, next) => {
    try {
        let arr = [];
        arr = null;
        arr.push("");
        console.log("1")
        res.contentType("text/html;charset=utf-8");
        res.end("响应成功");
    } catch (e) {
        console.log("2", e)
        res.locals.error = e;
        next();
    }
})

// 统一的错误处理，当如果请求地址输入错误时，就会定义到该页面
app.use((req, res, next) => {
    // const error = res.locals.error;
    // console.dir(error);
    // console.log("3", typeof error, error);
    // console.log("这是后的中间件");
    res.send({
        message: '页面出错了，请联系管理员'
    });
    next(); // 放行函数
})

app.listen(3000);