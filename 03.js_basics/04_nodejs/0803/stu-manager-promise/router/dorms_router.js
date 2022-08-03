const express = require('express');
const router = express.Router();
const dao = require('../dao/dorms_dao.js');
const pager = require('../utils/pager_helper.js');

router.get('/get_all.do', async (req, res, next) => {
    // dao.find_all({table: "aaaa"}).then(results => {
    //     res.json({
    //         code: 200,
    //         data: results
    //     })
    // }).catch(err => {
    //     res.locals.err = err;
    //     next()
    // });
    try {
        const results = await dao.find_all();
        res.json({
            code: 200,
            data: results
        });
    }catch(err) {
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
    }catch(err) {
        res.locals.err = err;
        next()
    }
});

module.exports = router;