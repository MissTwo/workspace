let UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
let adminMenu = ["首页", "宿舍管理员管理", "学生管理", "宿舍楼管理", "缺勤记录", "修改密码"];
headerInformationUpdate()
createMenu(adminMenu, ".list-group")
selectAllItem("#select-all")

// 更新头部信息
function headerInformationUpdate() {
    let roleType = {"administrator": "系统管理员", "dormManager": "宿舍管理员", "student": "同学"}
    $('#breadcrumb').append(`
     <li>
         <span>${UserInfo.username}</span>&nbsp;
         <span style="color:red">欢迎您！${roleType[UserInfo.role]}</span>
     </li>`
    )
}

// 渲染绘制菜单
function createMenu(menu, selector) {
    menu.forEach((item, index) => {
        $(selector).append(
            `<li class="list-group-item " id="item${index}" onclick="pageJump(id)">
                <span>${item}</span>
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
             </li>`
        )
    })
}

// 跳转不一样的页面
function pageJump(id) {
    if (id === "item0") location.href = './administrator.html'
    if (id === "item1") location.href = './dormAdminManagement.html'
    if (id === "item2") location.href = './studentManagement.html'
    if (id === "item3") location.href = './dormManagement.html'
    if (id === "item4") location.href = './absenceRecord.html'
    if (id === "item5") location.href = './changePassword.html'
}

// 点击菜单样式的切换
function selectEffectToggle(elementNode) {
    let arr = elementNode.parentNode.children
    arr.__proto__.forEach = Array.prototype.forEach
    arr.forEach(item => {
        $(item).removeClass("active")
    })
    $(elementNode).addClass("active")
}
//全选方法
function selectAllItem(selector) {
    $(selector).click(() => {
        if (document.querySelector(selector).checked) $(':checkbox').prop('checked', true)
        else $(':checkbox').prop('checked', false)
    })
}
// 模拟宿舍管理员的信息
let dormAdminManagement = Mock.mock({
    "dormAdminManagement|10": [
        {
            "id|+1": 1,
            "name": "@cname",
            "gender|1": ["男", "女"],
            "phoneNumber": /^1\d{10}/,
            "dormitory|1": ["第一宿舍楼", "第二宿舍楼", "第三宿舍楼", "第四宿舍楼", "第五宿舍楼"],
            "username": "@word(4,7)"
        }
    ]
})
