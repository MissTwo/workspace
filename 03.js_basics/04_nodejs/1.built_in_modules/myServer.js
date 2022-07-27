const http = require('http');
const server = http.createServer();
server.on("request", (req, res) => {
    // 解决中文乱码问题
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    console.log(req.url, req.method, req.url.substring(0, req.url.indexOf("?")));
    // if(req.url.substring(0,req.url.indexOf("?")).endsWith("login.html")) {
        // 读取文件的同步函数
        let r = require('fs').readFileSync(require('path').join(__dirname, '../../03_js进阶/学生宿舍管理系统/login.html'), 'utf8');
        res.end(r)
    // }
   //  // 读取文件的回调函数
   // require('fs').readFile(require('path').join(__dirname, '../../03_js进阶/学生宿舍管理系统/login.html'), 'utf8', (err, data) => {
   //     if (err) throw err;
   //     res.end(data);
   //
   // });
})
const port = 8080;
server.listen(port, () => {
    console.log(`服务已经启动，http://localhost:${port}`);
});
