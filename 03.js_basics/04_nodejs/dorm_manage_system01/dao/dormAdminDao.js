const pool=require('../dao/dbConnect.js')

// 数据库的操作
// 查询数据
function dormAdminList(callback,paramsObject) {
    // name,phone,gender,dorm_id
    let sql=`SELECT a.*,d.name dorm_name FROM dorm_admins a LEFT JOIN dorms d ON a.dorm_id=d.id WHERE 1=1 `
    let params=[]
    if(paramsObject.name){
        sql+=` AND a.name LIKE ?`
        params.push(`%${paramsObject.name}%`)
    }
    if(paramsObject.phone){
        sql+=` AND a.phone LIKE ?`
        params.push(`%${paramsObject.phone}%`)
    }
    if(paramsObject.gender){
        sql+=` AND a.gender=?`
        params.push(paramsObject.gender)
    }
    if(paramsObject.dorm_id){
        sql+=` AND d.dorm_id =?`
        params.push(paramsObject.dorm_id)
    }
    pool.query(sql,params,function(err, results) {
        callback(err, results)
    })
}
// 增加
function dormAdminAdd(callback,params) {
    console.log(1111111111111,params)
    // let params =[0]
    // for(let key in paramsObject){
    //     params.push(paramsObject[key])
    // }
    // console.log(params)
    // name,gender,account,phone,dorm_id
    const addSql='INSERT INTO dorm_admins VALUES ? ;'
    pool.query(addSql,params,(err, results) => {
        callback(err, results)
    })

}
// 修改
function dormAdminUpdate(callback,paramsObject) {
    let params =[]
    for(let key in paramsObject){
        params.push(paramsObject[key])
    }
    console.log(params)
    const updateSql='UPDATE dorm_admins SET name=?,gender=?,account=?,phone=?,dorm_id=? where id = ? ;'
    let a=pool.query(updateSql,params,(err, results) => {
       callback(err, results)
    })
    console.log(a)
}
// 删除每一行
function dormAdminDelete(callback,id) {
    const deleteSql='DELETE FROM dorm_manage_system.dorm_admins WHERE id = ? ;'
    pool.query(deleteSql,[id],(err, results) => {
        callback(err, results)
    })
}
// 批量删除
function dormAdminBatchDeletion(callback,ids) {
    const deleteSql = 'DELETE FROM dorm_manage_system.dorm_admins WHERE id = ? ;'
    ids = ids.split(",")
    ids.forEach((id) => {
        pool.query(deleteSql, id, (err, results) => {
            callback(err, results)
        })
    })
}

module.exports ={
    dormAdminList,dormAdminDelete,dormAdminUpdate,dormAdminAdd,dormAdminBatchDeletion
}