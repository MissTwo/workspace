const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const {expressjwt} = require("express-jwt");
const jwtSecret = "abc"; // 密钥
app.locals.jwtSecret = jwtSecret;
app.locals.jwt = jwt;

// 配置中间件,验证token，保存在请求的头部的Authorization这个属性中
app.use(expressjwt({
    secret: jwtSecret,
    algorithms: ['HS256']
}).unless({
    path: ["/getToken"]
}))

// /api会影响，router下的所有请求路径
app.use("/api", require("./routes/login_router.js"));
// app.use("/", require("./routes/login_router.js"));

app.get("/getToken", ((req, res) => {
    const toke = jwt.sign({
        account: "张三"
    }, jwtSecret, {
        expiresIn: '1day' // 过期时间
    });
    res.send("访问成功，您的token为：" + toke)
}));

app.get("/home.html", (req, res) => {
    console.log( req.auth);
    res.send("访问成功" + req.auth.account);
})

app.listen(3000);