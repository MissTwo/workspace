const express = require('express');
const app = express();
const path = require('path');

// 支持跨域
const cors = require('cors');
app.use(cors());

// 写在路由的前面
app.use(express.static(path.join(__dirname, 'public')))

//session相关
const session = require('express-session');
//中间件配置
app.use(session({
    secret: "express session secret",
    name: "session_id",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60, // 过期时间，只有部门cookie操作的库才支持
        // expires: 1 / 24 //通过属性，只是cookie就支持
    },
    rolling: true
}))

const whiteList = ['/login.html', '/json.html', '/user.html'];

//登录拦截
app.use((req, res, next) => {
    if (whiteList.indexOf(req.url) !== -1) {
        next();
    } else {
        if (!req.session.account) {
            // 实际的业务做法，就重定向到登录页面
            res.send("没有登录，请先登录");
        } else {
            next();
        }
    }
});

// 统一参数打印
app.use((req, res, next) => {
    console.log(req.url, req.query, req.body);
    next(); // 放行函数
})

//登录处理的方法
app.get('/login.html', (req, res) => {
    // ES6提供解构写法
    // let {account, password} = req.body;
    req.session.account = "haha"; //登录成功的标记
    res.send("登录成功");
})

app.get('/home.html', (req, res) => {
    console.log("req.session.account", req.session.account);
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