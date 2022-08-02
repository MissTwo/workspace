const express = require('express');
const router = express.Router();
const dao = require("../dao/dormAdminDao");

// 查询
router.get('/list', (req, res, next) => {
    let paramsObject = {
        name: req.query.name,
        phone: req.query.phone,
        gender: req.query.gender,
        dorm_id: req.query.dorm_id
    }
    // dao.dormAdminList((err,results)=>{
    //     if (err) {
    //         res.json({code:10001,message:"数据库连接失败"})
    //         throw err
    //     }
    //     res.json({code:0,message:"success",data:results});
    // },paramsObject)
    dao.dormAdminList(paramsObject).then((results) => {
        res.json({code: 0, message: "success", data: results});
    }).catch((err) => {
        res.json({code: 10001, message: "数据库连接失败"})
        throw err
    })
})
router.delete('/delete', (req, res, next) => {
    dao.dormAdminDelete((err, results) => {
        if (err) throw err;
        if (results.affectedRows > 0) {
            res.json({code: 0, message: "success", data: results});
        } else {
            res.json({code: 1, message: "failure"});
        }
    }, req.body.id)
})
router.put('/update', (req, res, next) => {
    let paramsObject = {
        name: req.body.name,
        gender: req.body.gender,
        account: req.body.account,
        phone: req.body.phone,
        dorm_id: req.body.dorm_id,
        id: req.body.id
    }
    dao.dormAdminUpdate((err, results) => {
        if (err) throw err;
        if (results.affectedRows > 0) {
            res.json({code: 0, message: "success", data: results});
        } else {
            res.json({code: 1, message: "failure"});
        }
    }, paramsObject)
})
router.post('/add', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    // let paramsObject = {
    //     name:req.body.name,
    //     gender:req.body.gender,
    //     account:req.body.account,
    //     phone:req.body.phone,
    //     dorm_id:req.body.dorm_id,
    // }
    dao.dormAdminAdd((err, results) => {
        if (err) throw err;
        if (results.affectedRows > 0) {
            res.json({code: 0, message: "success", data: results});
        } else {
            res.json({code: 1, message: "failure"});
        }
    }, req.body)

})
router.delete('/batch-deletion', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    dao.dormAdminBatchDeletion((err, results) => {
        if (err) throw err;
        if (results.affectedRows > 0) {
            res.json({code: 0, message: "success", data: results});
        } else {
            res.json({code: 1, message: "failure"});
        }
    }, req.body.ids)
})

module.exports = router
