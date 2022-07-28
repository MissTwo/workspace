const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// 处理post请求中的参数
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use("/dorm_admins", require("./routes/dorm_admins_router.js"));

app.listen(3000);