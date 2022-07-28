const express=require('express')
const bodyParser = require('body-parser')
const dormAdminManageRouter=require('./routes/dormAdminManage.js')
const app = express()
// post方法解析body
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/',dormAdminManageRouter)
app.use('/admin',require('./routes/dormAdminRouter'))
app.listen(3000, () => {
    console.log('http://localhost:3000')
})
