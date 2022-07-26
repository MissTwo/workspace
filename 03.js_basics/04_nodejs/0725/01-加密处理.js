const bcrypt = require('bcryptjs');
// 设置加密等级，如果不设置默认为10，最高为10
const salt = bcrypt.genSaltSync(10);
console.log("salt:", salt)
const password = "123";
const password_hash = "$2a$10$CYu9yOyYrtVUrECPMmVljO2QGjUxrH2wD2/c9YkQnEG5kZgSOtXCm";
const hash = bcrypt.hashSync(password, salt);
console.log("hash：", hash);
//比较原密码和加密之后内容
console.log(bcrypt.compareSync(password, hash));
console.log(bcrypt.compareSync(password, password_hash));