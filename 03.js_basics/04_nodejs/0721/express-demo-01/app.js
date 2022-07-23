const express = require('express');
const app = express();
const port = 8080;

//处理get请求
app.get('/', function(req, res) {
    console.log("默认请求连接");
    res.send("111这是中文aaa");
});

app.get('/home.html', function(req, res) {
    console.log("home.html");
    res.json({
        name: "张三",
        age: 20
    });
});

app.post('/', function(req, res) {
    res.send("post请求的响应内容");
});

app.listen(port, () => console.log(`listening on ${port}, http://localhost:${port}`));