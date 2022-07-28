const express = require('express');
const router = express.Router();
const dao = require("../dao/dorm_admins_dao.js");

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

router.post("/add_save.do", (req, res) => {
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


module.exports = router;