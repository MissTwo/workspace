const http = require("http");

// 创建服务器对象
const server = http.createServer();


//监听请求
server.on("request", function (req, res) {
    // req(request)是请求的对象，包含有请求相关的信息，比如，请求的地址，请求中的参数，请求的类型等信息
    // res(response)是响应对象，包含响应的内容，比如，响应头，响应的内容等。
    console.log("有一个请求进来了");
    console.log("-----------请求对象------------")
    // console.log(req);
    console.log(req.url, req.method);
    console.log("-----------响应对象------------")
    // console.log(res);
    // 指定响应内容，怎么去处理中文乱码
    // res.end("11111111这是服务器响应内容abc");
    // 读取文件
    let h=require('fs').readFile('02-练习的html文档.html', 'utf8', (err, data) => {
        if (err) throw err;
        res.end(`${data}`);
    });

});

// 启动服务。要能够识别端口号被占用的报错 address already in use :::3306
const port = 8080;
server.listen(port, function() {
    console.log(`服务已经启动，http://localhost:${port}`);
});

//扩展：如何返回一个html页面作为响应
