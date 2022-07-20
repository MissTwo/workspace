const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require('querystring');

const server = http.createServer();

server.on("request", (req, res) => {
    // req.setHeader("Content-Type", "text/html; charset=utf-8"); // 请求的中文乱码
    res.setHeader("Content-Type", "text/html; charset=utf-8"); // 解决响应的中文乱码
    // res.end("中文乱码已解决");
    // 同步函数
    // const html = fs.readFileSync(path.join(__dirname, "login.html"), "utf8");
    // res.end(html);
    // 回调函数
    let url_obj = url.parse(req.url);
    console.log(req.url, req.method, url);
    if (url_obj.pathname.endsWith("login.html")) {
        // 处理get参数
        let params = new URLSearchParams(url_obj.query);
        console.log(params);
        fs.readFile(path.join(__dirname, "login.html"), "utf8", function (e, data) {
            res.end(data);
        });
    } else if (url_obj.pathname.endsWith("login.do")) {
        console.log("11");
        // post请求的参数处理
        // 通过data事件来拼接post参数
        let param_str = "";
        req.on("data", function (param) {
            param_str += param;
        })
        // 通过end事件来通知post参数拼接完成
        req.on("end", () => {
            console.log(param_str);
            console.log(querystring.parse(param_str));
            console.log(new URLSearchParams(param_str));
            res.end(param_str);
        })
    } else {
        res.end("404，没有该页面");
    }

});

const port = 8080;
server.listen(port, () => console.log(`服务已经启动，http://localhost:${port}`));