/**
 * 登录成功，获取token
 * @param req
 * @param res
 */
function do_login(req, res) {
    const toke = res.app.locals.jwt.sign({
        account: "张三"
    }, res.app.locals.jwtSecret, {
        expiresIn: '1day' // 过期时间
    });
    res.send("访问成功，您的token为：" + toke)
}

module.exports = {
    do_login
}