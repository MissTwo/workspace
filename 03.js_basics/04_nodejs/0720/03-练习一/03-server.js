const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer();

server.on("request", (req, res) => {
    // req.setHeader("Content-Type", "text/html; charset=utf-8"); // 请求的中文乱码
    res.setHeader("Content-Type", "text/html; charset=utf-8"); // 解决响应的中文乱码
    // res.end("中文乱码已解决");
    // 同步函数
    // const html = fs.readFileSync(path.join(__dirname, "login.html"), "utf8");
    // res.end(html);
    // 回调函数
    let url = req.url;
    let index = req.url.indexOf("?");
    if (index !== -1) {
        url = req.url.substring(0, index);
    }
    console.log(req.url, req.method, url);
    if (url.endsWith("login.html")) {
        fs.readFile(path.join(__dirname, "login.html"), "utf8", function (e, data) {
            res.end(data);
        });
    } else if (url.endsWith("login.do")) {
        console.log("11");
        res.end("11");
    } else {
        res.end("404，没有该页面");
    }

});

const port = 8080;
server.listen(port, () => console.log(`服务已经启动，http://localhost:${port}`));