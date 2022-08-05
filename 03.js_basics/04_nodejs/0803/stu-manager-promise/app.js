const express = require('express');
const app = express();
const path = require("path");
const { query } = require("express-validator");
const bodyParser = require("body-parser");
const pager = require('./utils/pager_helper.js');

app.use(express.static(path.join(__dirname, "public")));
// 处理post请求参数中间件
app.use(bodyParser.json()); // 处理json格式的请求参数
app.use(bodyParser.urlencoded({ extended: true })); // 使用qs库来处理post参数

// 1. 导入用于生成 JWT 字符串的包
const jwt = require("jsonwebtoken");
// 2. 导入用于将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
const {expressjwt} = require("express-jwt");
// 3. secret 一个密钥字符串
const secretKey = "stu-manager key";
// 挂载全局，方便其它Router中使用
app.locals.jwt = jwt;
app.locals.expressjwt = expressjwt;
app.locals.secretKey = secretKey;

// token验证中间件，如果请求中没有token信息，不通过。unless：白名单
app.use(expressjwt({
    secret: secretKey,
    algorithms: ['HS256']
    // 白名单
}).unless({
    path: ["/login.do", "/logout.do"]
}));

// 自定义中间，一、打印请求参数；二、处理分页相关的参数
const rules = [
    query("page_num").toInt().optional(),
    query("page_size").toInt().optional()
];
app.use(...rules, function (req, res, next) {
    console.log("当前请求地址", req.url);
    console.log("get请求参数", req.query);
    console.log("post请求参数", req.body);

    pager.page_size = req.query.page_size;
    pager.page_num = req.query.page_num;
    // console.log("app pager", pager.page_num, pager.page_size);
    next();
})

// 路由中间件
app.use("/", require("./router/login_router"));
app.use("/dorms", require("./router/dorms_router.js"));
app.use("/dorm_admins", require("./router/dorm_admins_router.js"));
app.use("/students", require("./router/students_router"));
app.use("/menus", require("./router/menus_router"));

// 统一错误处理
app.use((req, res) => {
    console.log("统一错误处理");
    res.json({
        code: 500,
        err: res.locals.err
    })
})

app.listen(3000);