const express = require('express')
const app=express()
// 处理post请求中的参数
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const cors = require("cors");
app.use(cors());
// 登录
app.use('/',require("./routers/login.js"))
// 宿舍管理员管理
app.use('/manager',require("./routers/dorm_admin_management.js"))
// 学生管理
app.use('/student',require("./routers/stu_management.js"))
// 宿舍楼管理
app.use('/dorms',require("./routers/dorm_management.js"))
// 缺勤管理
app.use('/absence_manage',require("./routers/absence_record_manage.js"))
// 学生缺勤
app.use('/stu_absence',require("./routers/stu_absence_record.js"))
// 修改密码
app.use('/',require("./routers/change_password.js"))
// 头像上传
app.use('/',require("./routers/avatar_upload.js"))

app.listen(3000,() =>{
    console.log('http://localhost:3000')
})