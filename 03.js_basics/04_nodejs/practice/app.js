const express = require('express');
const app = express();
const path = require('path');

// 跨域
const cors= require('cors');
app.use(cors());

// 静态资源的处理
app.use(express.static(path.join(__dirname, 'public')))

// session的配置
const session= require('express-session');

// 参数的配置
app.use(session({
    // 作为服务器端生成session的签名
    secret: 'keyboard cat',
    // 保存在本地cookie的一个名字，默认connect.sid可以不设置
    name: 'session_id',
    // 强制保存session即使他并没有变化
    resave: false,
    // 强制将未初始化的session存储
    saveUninitialized: true,
    cookie: {
        // 设置最大时间，过期时间
        maxAge: 3600 * 24
    },
    // 重置过期时间
    rolling: true
}));

// token标识
// 1.导入用于生成JWT字符串的包
const jwt = require('jsonwebtoken');
// 2.导入用于将客户端发过来的jwt字符串，解析还原成json对象的包
const {expressjwt} = require('express-jwt');
// 3.secret一个密钥字符串
const secretKey="manager key";

// 配置中间件：如果请求中没有token就不通过，白名单需要要token可通过
app.use(expressjwt({
    secret: secretKey,
    algorithms: ['HS256'],

}))

// 自定义中间件，统一参数打印
app.use(function (req, res, next) {
    // req.query :保存get请求参数对象
    // req.body:保存post请求参数对象
    console.log(req.url,req.method,req.query,req.body)
    next();
})
app.post('/', (req, res) => {
    res.send("这是用户登录页");
})
app.get('/api', (req, res) => {
    res.json({success: true, message: '请求成功了哦'})
})
// 统一错误处理
app.use((req, res)=> {
    res.status(404).json({success: false,message:'请求错误，失败了'})
})
app.listen(3000,function(){
    console.log('http://localhost:3000')
});
