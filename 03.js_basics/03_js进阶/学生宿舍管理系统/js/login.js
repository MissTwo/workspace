/*
*localStorage的方法：
* localStorage.getItem(key):获取指定key本地存储的值
*localStorage.setItem(key,value)：将value存储到key字段；
*localStorage.removeItem(key):删除指定key本地存储的值
*/
//TODO:检查localStorage中的UserInfo，若存在，则直接根据其中的role跳转到对应页面

let username = document.querySelector('input[type="text"]'),
    password = document.querySelector("input[type='password']"),
    identity = document.querySelectorAll('input[type="radio"]'),
    remember = document.querySelector('#remember'),
    usernameInfo = document.querySelector('.username-info'),
    passwordInfo = document.querySelector('.password-info');

// TODO:页面加载时，判断localstorage中rememberMe是否存在，如果存在，将其中的username和password填入input
let userStr = localStorage.getItem('RememberMe')
if (userStr) {
    let userObj = JSON.parse(userStr)
    username.value = userObj.account;
    password.value = userObj.password;
    checkElementByRole(userObj.role);
    remember.checked = true;//将选择保存账户密码的复选框更改为选中
}

function checkElementByRole(role) {
    document.querySelector(`input[name="optionsRadios"][value=${role}]`).checked = true
}


// TODO:获取rememberMe checkbox
login.addEventListener("click", function () {

    // TODO: 提交数据之前检查合法性
    // 账户密码认证
    if (!(checkUsername(username.value) && checkPassword(password.value))) return
    // 角色认证
    if (!roleJudgment(identity)) return
    let role = roleJudgment(identity)
    // 存储数据
    let data = {
        account: username.value,
        password: password.value,
        role: role
    }
    $.post("http://localhost:3000/login_check", data, function (result) {
        if (result.code === 0) {
            // TODO:将用户信息写入localstorage,user{username; token; expire;}
            // TODO:如果rememberMe勾选了，那么将用户名密码存入localstorage,rememberMe{username; password;}
            // TODO:如果rememberMe没勾选了，那么localstorage中的rememberMe删掉
            if (remember.checked) {
                localStorage.setItem("RememberMe", JSON.stringify(data))
            } else {
                localStorage.removeItem("RememberMe")
            }
            // TODO:跳转页面 window.location
            localStorage.setItem("User", JSON.stringify(data))
            // localStorage.setItem("UserInfo", JSON.stringify(result.data[0]))
            sessionStorage.setItem("UserInfo", JSON.stringify(result.data[0]))
            if (data.role === "dormManager") {
                return location.href = "dormManager.html"
            } else if (data.role === "administrator") {
                return location.href = "administrator.html"
            } else if (data.role === "student") {
                return location.href = "student.html"
            }
        }
        // TODO:提示错误
        usernameInfo.innerText = "⚠请输入正确的用户名"
        passwordInfo.innerText = "⚠请输入正确的密码"
    },"json")
});

// TODO:实现以下方法替代原代码
function checkUsername(value) {
    if (value === "") {
        usernameInfo.innerText = "⚠账号不能为空"
        return
    } else if (value.trim().length < 6 || value.trim().length > 12) {
        usernameInfo.innerText = "⚠账号不能低于6位且不能高于12位"
        return
    }
    return value
}

function checkPassword(value) {
    // TODO:增加正则判断
    // 匹配大小写字母和数组
    let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{6,16}$/
    // TODO.test(passwordTag.value);
    if (value === "") {
        passwordInfo.innerText = "⚠密码不能为空"
        return
    } else if (value.trim().length < 6 || value.trim().length > 12) {
        passwordInfo.innerText = "⚠密码不能低于6位且不能高于12位"
        return
    }
    // 正则匹配密码
    // else if (reg.test(value.trim())) {
    //     passwordInfo.innerText = ""
    //     return value.trim()
    // }
    return value.trim()
}

function roleJudgment(identity) {
    identity.__proto__.find = Array.prototype.find
    role = identity.find(item => item.checked)
    if (role === undefined) {
        alert("请选择登录角色")
        return
    }
    return role.value
}

// let RoleTable = {
//     "dormManager": managers,
//     "administrator": admins,
//     "student": students,
// }

// Mock.mock("/login", "post", function (data) {
//     let params = parseParam(data.body)
//     if (checkUserPasswd(params.role, params.username, params.password)) {
//         return {
//             code: 0,
//             msg: "login success"
//         }
//     }
//     return {
//         code: 1,
//         msg: "login failed"
//     }
// })
//
// function checkUserPasswd(role, username, password) {
//     return !(!RoleTable[role][username] || RoleTable[role][username] !== password)
// }
//
// function parseParam(params) {
//     const newParams = params.split("&");
//     const urlObj = new Object();
//     for (let i = 0; i < newParams.length; i++) {
//         const newArray = newParams[i].split('=');
//         urlObj[newArray[0]] = newArray[1]
//     }
//     return urlObj;
// }