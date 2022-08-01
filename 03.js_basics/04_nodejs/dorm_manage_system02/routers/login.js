const express = require('express')
const router= express.Router()
const login_dao=require('../dao/login_dao')
const {check, validationResult} = require('express-validator');
// 用户名及密码的验证
router.post('/login_check',[
    check('account').notEmpty().withMessage("用户名不能为空").bail()
        .trim().isLength({min: 6, max: 12}).withMessage("长度必须在6到12位之间"),
    check('password').notEmpty().withMessage("密码不能为空").bail()
        .trim().isLength({min: 6, max: 12}).withMessage("长度必须在6到12位之间"),
    check('role').notEmpty().withMessage("请选择登录身份")],
    (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                errors: errors.array()
            });
        }
        let object =[req.body.account,req.body.password,req.body.role]
        login_dao.loginCheck(object, (err, results) => {
            console.log(req.body)
            if (err) throw err;
            res.json({code:0,message:"success",data:results});
        })
    })

module.exports=router