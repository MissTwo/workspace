const express = require('express');
const router = express.Router();
const dao = require("../dao/dorm_admins_dao.js");
const {query, body, validationResult} = require('express-validator');
// body：处理req.body中的参数
// validationResult：保存验证结果
/**
 * 分页显示，支持搜索
 */
router.get("/get_by_page.do", (req, res) => {
    dao.find_by_page(req.query, req.query.page_num, req.query.page_size, (results) => {
        res.json({
            code: 200,
            message: "请求成功", // 一般只需要写错误信息
            data: results
        });
    })
});

const rules = [
    body("account", "通用的自定义错误").trim()
        .exists().withMessage("属性是必填的").bail()
        .isEmail().withMessage("账号必须是邮箱").bail()
        .isLength({min: 5, max: 20}).withMessage("长度必须在5到20之间"),
    body("password").trim().exists().withMessage("属性是必填的").bail()
        .isLength({min: 5, max: 20}).withMessage("长度必须在5到20之间"),
    body("gender").trim().isIn(["0", "1"]).withMessage("值只能是0或1")
        .optional(),
    body("dorm_id").toInt().optional()
];
router.post("/add_save.do", ...rules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }
    //数据合法性验证
    // 非空处理
    // if (!req.body.username || req.body.username.trim() == "") {
    //     res.json({
    //         code: 500,
    //         message: "用户名不能为空"
    //     })
    //     return;
    // }
    // if (!req.body.password || req.body.password.trim() == "") {
    //     res.json({
    //         code: 500,
    //         message: "密码不能为空"
    //     })
    //     return;
    // }
    // if (!req.body.phone || req.body.phone.trim() == "") {
    //     res.json({
    //         code: 500,
    //         message: "手机号不能为空"
    //     })
    //     return;
    // }
    // 账号、手机不能重复
    dao.check_exists("account", req.body.account, 0, (isExists) => {
        if (isExists) {
            res.json({
                code: 500,
                message: `${req.body.account}该账号已存在`
            })
        } else {
            dao.check_exists("phone", req.body.phone, 0, (isExists) => {
                if (isExists) {
                    res.json({
                        code: 500,
                        message: `${req.body.phone}该手机号已存在`
                    })
                } else {
                    dao.insert(req.body, (results, insertId) => {
                        res.json({
                            code: results ? 200 : 500,
                            message: results ? "添加保存成功" : "添加保存失败",
                            insertId
                        })
                    })
                }
            });
        }
    });

});

router.post("/update_save.do", (req, res) => {
    //数据合法性验证
    // 非空处理
    if (!req.body.username || req.body.username.trim() == "") {
        res.json({
            code: 500,
            message: "用户名不能为空"
        })
        return;
    }
    if (!req.body.password || req.body.password.trim() == "") {
        res.json({
            code: 500,
            message: "密码不能为空"
        })
        return;
    }
    if (!req.body.phone || req.body.phone.trim() == "") {
        res.json({
            code: 500,
            message: "手机号不能为空"
        })
        return;
    }
    // 账号、手机不能重复
    dao.check_exists("account", req.body.account, req.body.id, (isExists) => {
        if (isExists) {
            res.json({
                code: 500,
                message: `${req.body.account}该账号已存在`
            })
        } else {
            dao.check_exists("phone", req.body.phone, req.body.id, (isExists) => {
                if (isExists) {
                    res.json({
                        code: 500,
                        message: `${req.body.phone}该手机号已存在`
                    })
                } else {
                    dao.update(req.body, req.body.id, (results) => {
                        res.json({
                            code: results ? 200 : 500,
                            message: results ? "编辑保存成功" : "编辑保存失败",
                        })
                    })
                }
            });
        }
    });
});

router.get("/delete_by_id.do", (req, res) => {
    let {id} = req.query;// let id = req.query.id
    dao.delete_by_ids(id, (results) => {
        res.json({
            code: results ? 200 : 500,
            message: results ? "删除成功" : "删除失败"
        })
    });
});

router.get("/delete_by_ids.do", (req, res) => {
    let {ids} = req.query;
    dao.delete_by_ids(ids, (results) => {
        res.json({
            code: results ? 200 : 500,
            message: results ? "删除成功" : "删除失败"
        })
    });
});
// 密码是否一致的验证，自定义规则
const cfm_rule = body("new_password").custom((value, {req}) => value == req.body.cfm_password);
router.post("/test_validator.do",
    // cfm_rule,
    (req, res) => {
        cfm_rule.run(req).then(r => {
            console.log("rrrrr:", r)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    errors: errors.array()
                });
            }
            res.send("请求完成");
        });

    })


module.exports = router;