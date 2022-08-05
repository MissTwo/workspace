const express = require("express");
const router = express.Router();
const { query, body, validationResult } = require('express-validator');
const admins_dao = require('../dao/admins_dao');
const dorm_admins_dao = require('../dao/dorm_admins_dao');
const students_dao = require('../dao/students_dao');

const rules = [
    body("account").trim()
        .exists().withMessage("属性是必填的").bail()
        .isLength({ min: 5, max: 20 }).withMessage("长度必须在5到20之间"),
    body("password").trim().exists().withMessage("属性是必填的").bail()
        .isLength({ min: 5, max: 20 }).withMessage("长度必须在5到20之间"),
    body("type").trim().exists().withMessage("属性是必填的").bail(),
    body("rem").trim().toBoolean().optional(),
];
router.post('/login.do', ...rules, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }

    let login_bean;
    const {type} = req.body;
    if (type == 0) {
        login_bean = await admins_dao.login(req.body);
    } else if (type == 1) {
        login_bean = await dorm_admins_dao.login(req.body);
    } else if (type == 2) {
        login_bean = await students_dao.login(req.body);
    }

    if (login_bean) {
        // 登录成功
        // 是否需要记住密码
        // 产生token
        const token = res.app.locals.jwt.sign({
            account: login_bean.account,
            type: type,
            // role: login_bean.role
        }, res.app.locals.secretKey, {
            expiresIn: '1days'
        });
        res.json({
            code: 200,
            token_header: "Bearer ",
            token
        });
    } else {
        // 登录失败，账号或密码错误
        res.json({
            code: 500,
            message: "登录失败，账号或密码错误"
        });
    }
});

module.exports = router;