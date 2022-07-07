/*
    *localStorage的方法：
    * localStorage.getItem(key):获取指定key本地存储的值
    *localStorage.setItem(key,value)：将value存储到key字段；
    *localStorage.removeItem(key):删除指定key本地存储的值
    */
let username = document.querySelector('input[type="text"]'),
    password = document.querySelector("input[type='password']"),
    remember=document.getElementById('remember'),
    login = document.querySelector('#login'),
    usernameInfo = document.querySelector('.username-info'),
    passwordInfo = document.querySelector('.password-info');
let user={
    "name":"1111",
    "pwd":"11111"
}
let str=JSON.stringify(user)
// TODO:页面加载时，判断localstorage中rememberMe是否存在，如果存在，将其中的username和password填入input
if(localStorage.getItem('name')&&localStorage.getItem('pwd')){
    // username.value = localStorage.getItem();
    password.value = localStorage.getItem('pwd');
    remember.checked=true;//将选择保存账户密码的复选框更改为选中
}

let users = {
    '111111': '222222',
    '222222': '222222',
    '333333': '222222',
    '444444': '222222',
    '555555': '222222',
    '666666': '222222',
}

Mock.mock("/login", "post", function (data) {
    let params = parseParam(data.body)
    if (checkUserPasswd(params.username, params.password)) {
        return {
            code: 0,
            msg: "login success"
        }
    }
    return {
        code: 0,
        msg: "login failed"
    }
})

function checkUserPasswd(username, password) {
    return !(!users[username] || users[username] !== password)
}

function parseParam(params) {
    const newParams = params.split("&");
    const urlObj = new Object();
    for (let i = 0; i < newParams.length; i++) {
        const newArray = newParams[i].split('=');
        urlObj[newArray[0]] = newArray[1]
    }
    return urlObj;
}
// 点击记住密码存入到local storage中
remember.addEventListener('click',function (e){
    if(remember.checked&&username.value!=''&&password.value!=''){
        localStorage.setItem('name', username);
        localStorage.setItem('pwd',password);
    }else{
        //若不点 则把已经记录到localStorge 中的值删除
        localStorage.removeItem('name');
        localStorage.removeItem('pwd');
    }
})
// TODO:获取rememberMe checkbox
username.addEventListener('input', function () {
    if (username.value === "" || username.value.trim().length < 6) {
        usernameInfo.style.display = 'block'
    } else {
        usernameInfo.style.display = 'none'
    }
});
password.addEventListener('input', function () {
    if (password.value === "" || password.value.trim().length < 6) {
        passwordInfo.style.display = 'block'
    } else {
        passwordInfo.style.display = 'none'
    }

});
password.addEventListener('change', function () {
    // if (password.value===""||password.value)
    // console.log(1)
});
login.addEventListener('click', function () {
    // 测试跳转
    location.href='7.简易购物车.html'

    // TODO: 提交数据之前检查合法性
    let data = {
        username: username.value,
        password: password.value
    }
    $.post("/login", data, function (result) {
        console.log(result)
        if (result.code === 0) {
            // TODO:将用户信息写入localstorage,user{username; token; expire;}
            // TODO:如果rememberMe勾选了，那么将用户名密码存入localstorage,rememberMe{username; password;}
            // TODO:如果rememberMe没勾选了，那么localstorage中的rememberMe删掉
            // TODO:跳转页面 window.location
            sessionStorage.setItem("log_token","ok")
            location.href='7.简易购物车.html'
            return
        }
        // TODO:提示错误
    })
});

// TODO:实现以下方法替代原代码
function checkUsername() {

}

function checkPassword() {
    // TODO:增加正则判断
    let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{6,16}$/
    // TODO.test(passwordTag.value);
}