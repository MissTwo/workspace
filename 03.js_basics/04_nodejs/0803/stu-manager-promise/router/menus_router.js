const express = require('express');
const router = express.Router();
const dao = require('../dao/menus_dao.js');
const pager = require('../utils/pager_helper.js');
const { query, body, validationResult } = require('express-validator');

router.get('/get_all.do', async (req, res, next) => {
    try {
        const results = await dao.find_all();
        res.json({
            code: 200,
            data: results
        });
    } catch (err) {
        console.log(err);
        res.locals.err = err;
        next()
    }
});

router.get("/get_by_page.do", async (req, res, next) => {
    try {
        const results = await dao.find_by_page(req.query);
        const total = await dao.find_count(req.query);
        pager.count = total;
        res.json({
            code: 200,
            data: results,
            pager: {
                ...pager,
                count: pager.count,
                page_size: pager.page_size,
                page_num: pager.page_num
            }
        });
    } catch (err) {
        console.log(err);
        res.locals.err = err;
        next()
    }
});

const rules = [
    body("title").trim()
        .exists().withMessage("属性是必填的").bail()
        .isLength({ min: 1, max: 20 }).withMessage("长度必须在1到20之间"),
    body("href").trim()
        .exists().withMessage("属性是必填的").bail()
        .isLength({ min: 1, max: 20 }).withMessage("长度必须在1到20之间"),
];
router.post("/add_save.do", ...rules, async (req, res, next) => {
    //数据合法性验证
    // 非空处理
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }
    try {
        let isExists = await dao.check_exists("title", req.body.title);
        if (isExists) {
            return res.json({
                code: 500,
                message: "菜单标题不能重复"
            });
        }
        isExists = await dao.check_exists("href", req.body.href);
        if (isExists) {
            return res.json({
                code: 500,
                message: "菜单链接不能重复"
            });
        }

        const { result, insertId } = await dao.insert(req.body);
        res.json({
            code: result > 0 ? 200 : 501,
            message: result > 0 ? "添加成功" : "添加失败",
            insertId: result > 0 ? insertId : 0
        });
    } catch (err) {
        console.log(err);
        res.locals.err = err;
        next()
    }
});

router.post("/update_save.do", ...rules, async (req, res, next) => {
    //数据合法性验证
    // 非空处理
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }
    try {
        let isExists = await dao.check_exists("title", req.body.title, req.body.id);
        if (isExists) {
            return res.json({
                code: 500,
                message: "菜单标题不能重复"
            });
        }
        isExists = await dao.check_exists("href", req.body.href, req.body.id);
        if (isExists) {
            return res.json({
                code: 500,
                message: "菜单链接不能重复"
            });
        }

        const { result } = await dao.update_by_primary_key(req.body, req.body.id);
        res.json({
            code: result > 0 ? 200 : 501,
            message: result > 0 ? "编辑成功" : "编辑失败",
        });
    } catch (err) {
        console.log(err);
        res.locals.err = err;
        next()
    }
});

const rules_delete = [
    query("ids").exists().withMessage("属性是必填的")
]
router.get("/delete_by_ids.do", ...rules_delete, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }
    try {
        const { result } = await dao.delete_by_primary_key(req.query.ids);
        res.json({
            code: result > 0 ? 200 : 501,
            message: result > 0 ? "删除成功" : "删除失败",
        });
    } catch (err) {
        console.log(err);
        res.locals.err = err;
        next()
    }
});

const rules_edit = [
    query("id").exists().withMessage("属性是必填的")
]
router.get("/get_by_id.do", ...rules_edit, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }
    try {
        const result = await dao.find_by_primary_key(req.query.id);
        console.log("result", result);
        res.json({
            code: result ? 200 : 501,
            data: result
        });
    } catch (err) {
        console.log(err);
        res.locals.err = err;
        next()
    }
});


module.exports = router;