
const express = require("express");
const app = express();
const path = require("path");

// app.locals 全局变量，影响所有用户
// res.locals 请求变量，只影响当次请求

// 后台跨域处理，在html页面中使用ajax去访问不同域名的接口
const cors = require("cors");
app.use(cors());

// 静态资源处理
app.use(express.static(path.join(__dirname, 'public')));

// session配置
const session = require("express-session");
// 配置完后，服务器就给浏览器发一个名称为session_abc，的cookie值
// 所有的req对象上都会多一个属性session，不同用户不一样。
app.use(session({
    secret: "abc",
    name: "session_abc",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 // 设置过期时间
    },
    rolling: true
}));

// 自定义中间件，统一参数打印
app.use(function(req, res, next) {
    //req.query：保存get请求参数对象
    //req.body：保存post请求参数对象
    console.log(req.url, req.method, req.query, req.body);
    next();
});

app.get("/json.html", (req, res) => {
    //基本的请求处理
    res.json({
        msg: "这是首页"
    });
});

// 普通get请求
app.get("/", (req, res) => {
    //基本的请求处理
    res.send("这是首页");
});

// post请求
app.post("/", (req, res) => {
    //基本的请求处理
    res.send("这是首页");
});

// restful api，适合做去到编辑页面功能，传一个id，然后通过id查询数据，将查询到的数据显示到页面上
app.put("/", (req, res) => {
    //基本的请求处理
    res.send("这是首页");
});
// restful api，实现删除，没有delete之前都是通过get来实现的
app.delete("/", (req, res) => {
    //基本的请求处理
    res.send("这是首页");
});
// 如果一个路径需要支持所有的请求类型
app.all("/", (req, res) => {
    //基本的请求处理
    res.send("这是首页");
});

// 统一错误处理
app.use((req, res, next) => {
    res.send("页面出错了");
})

app.listen(3000);