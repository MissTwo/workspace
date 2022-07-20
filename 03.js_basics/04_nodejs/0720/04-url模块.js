// const url = require('url');
// const l = url.parse("https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash");
// console.log(l);
// // 方式二
// const myURL = new URL('/foo?name=a&age=20', 'https://example.org/');
// console.log(myURL);

const http = require("http");
const server = http.createServer();
server.on("request", (req, res) => {
    console.log("11111");
    // console.log(req);
    console.log(req.url);
    // let url_obj = url.parse(req.url);
    // console.log(url_obj);
    let url_obj = new URL(req.url, "http://localhost:8080");
    console.log(url_obj);
    if (url_obj.pathname.endsWith("login.html")) {
        res.end("login.html" + url_obj.searchParams);
    } else if (url_obj.pathname.endsWith("login.do")) {
        res.end("login.do");
    } else {
        res.end("404");
    }
});

server.listen(8080, () => {
    console.log(`http://localhost:8080`)});