const express = require('express')
const router =express.Router();

const mysql= require('mysql');

// 数据库使用连接池
const pool=mysql.createPool({
    connectionLimit : 10,
    host:'localhost',
    user:'root',
    password:'root',
    database:'dorm_manage_system',
    port:3306,
})


// 查询宿舍管理员信息
router.get('/manage/search',(req,res,next)=> {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    const baseSql='SELECT a.*,d.`name` dorm_name FROM dorm_admins a LEFT JOIN dorms d ON a.dorm_id=d.id '
    let name = req.params.name
    let number = req.params.number
    let gender=req.params.gender
    let dorm_name = req.params.dorm_name
    let obj={
        name:name,
        number:number,
        gender:gender,
        dorm_name:dorm_name
    }
    if(name!='' ){
        let sql=`SELECT a.*,d.name dorm_name FROM dorm_admins a LEFT JOIN dorms d ON a.dorm_id=d.id WHERE a.name like ? ;`
        let w='%${name}%'
        pool.query(sql,name,function(err, results,fields) {
            if (err) throw err;
            if(results.affectedRows > 0){
                res.json({code:0,message:"success",data:result});
            }else{
                res.json({code:1,message:"failure"});
            }
        })
    }


})
// 删除每一行管理员信息
router.delete('/manager/delete', (req,res,next)=>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    let id=req.body.id
    const deleteSql='DELETE FROM dorm_manage_system.dorm_admins WHERE id = ? ;'
    pool.query(deleteSql,[id],(err, results) => {
        if (err) throw err;
        if(results.affectedRows > 0){
            res.json({code:0,message:"success",data:results});
        }else{
            res.json({code:1,message:"failure"});
        }
    })
})
// 每一行数据的修改
router.put('/manager/update', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    const updateSql='UPDATE dorm_admins SET (?,?,?,?,?,?) where id = ? ;'
    pool.query(addSql,[0,req.body.name,req.body.gender,req.body.account,req.body.phone,req.body.dorm_id,req.body.id],(err, results) => {
        if (err) throw err;
        if(results.affectedRows > 0){
            res.json({code:0,message:"success",data:results});
        }else{
            res.json({code:1,message:"failure"});
        }
    })
})
// 添加每一行数据
router.post('/manager/add', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    const addSql='INSERT INTO dorm_admins VALUES (?,?,?,?,?,?) ;'
    pool.query(addSql,[0,req.body.name,req.body.gender,req.body.account,req.body.phone,req.body.dorm_id],(err, results) => {
        if (err) throw err;
        if(results.affectedRows > 0){
            res.json({code:0,message:"success",data:results});
        }else{
            res.json({code:1,message:"failure"});
        }
    })
})
// 批量删除数据
router.delete('/manager/batch-deletion', (req, res, next) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    const deleteSql='DELETE FROM dorm_manage_system.dorm_admins WHERE id = ? ;'
    let ids=req.body.ids.split(",")
    ids.forEach((id) => {
        pool.query(deleteSql,id,(err, results) => {
            if (err) throw err;
            if(results.affectedRows > 0){
                res.json({code:0,message:"success",data:results});
            }else{
                res.json({code:1,message:"failure"});
            }
        })
    })

})
module.exports=router
