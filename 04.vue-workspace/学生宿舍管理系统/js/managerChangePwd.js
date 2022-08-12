createMenu(managerMenu, ".list-group")
selectEffectToggle(document.querySelector("#item3"))
let user = JSON.parse(localStorage.getItem("User"))
$('#confirmChange').click(function () {
    changePassword($('#oldPassword').val(), $('#newPassword').val(), $('#repeatPassword').val())
})

// 修改密码
function changePassword(oldPwd, newPwd, repeatPwd) {
    if (oldPwd != user.password) {
        $('.oldInfo').text('⚠密码输入不正确')
        return
    }
    checkPassword(newPwd)
    if (newPwd != repeatPwd) {
        $('.repeatInfo').text('⚠密码输入不一致')
        return;
    }
    // user.password = newPwd
    location.href='./login.html'

}

function checkPassword(value) {
    // TODO:增加正则判断
    // 匹配大小写字母和数组
    let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9]{6,16}$/
    // TODO.test(passwordTag.value);
    if (value === "") {
        $(".newInfo").text("⚠密码不能为空")
        return
    } else if (value.trim().length < 3 || value.trim().length > 18) {
        $(".newInfo").text("⚠密码不能低于3位且不能高于18位")
    }
    return value.trim()
}
