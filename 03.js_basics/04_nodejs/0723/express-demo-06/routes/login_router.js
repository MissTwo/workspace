const express = require('express');
// const jwt = require("jsonwebtoken");
const router = express.Router();
const login_api = require("../api/login_api.js");

router.get("/login.html", login_api.do_login);

router.post("/login.do", (req, res) => {
    res.send("访问成功");
});

// 千万要注意，不要忘记了
module.exports = router;