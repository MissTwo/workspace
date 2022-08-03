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
app.use("/dorms", require("./router/dorms_router.js"));

// 统一错误处理
app.use((req, res) => {
    console.log("统一错误处理");
    res.json({
        code: 500,
        err: res.locals.err
    })
})

app.listen(3000);