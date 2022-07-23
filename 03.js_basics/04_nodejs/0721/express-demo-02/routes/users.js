var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // url中的get请求参数
  console.log(req.query, req.url);
  res.send('get respond with a resource');
});

router.post('/', function(req, res, next) {
  // post请求参数
  console.log(req.query);
  console.log(req.body);
  res.send('post respond with a resource');
});

module.exports = router;
