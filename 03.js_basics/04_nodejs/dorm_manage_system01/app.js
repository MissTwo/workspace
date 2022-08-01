const express=require('express')
// 跨域的处理
const cors = require("cors");
const bodyParser = require('body-parser')
const dormAdminManageRouter=require('./routes/dormAdminManage.js')
const app = express()
app.use(cors());
// post方法解析body
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/',dormAdminManageRouter)
app.use('/admin',require('./routes/dormAdminRouter'))
app.listen(3000, () => {
    console.log('http://localhost:3000')
})
