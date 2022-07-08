let adminMenu = ["首页", "宿舍管理员管理", "学生管理", "宿舍楼管理", "缺勤记录", "修改密码"];
createMenu(adminMenu, ".list-group")
// 渲染绘制菜单
function createMenu(menu, selector) {
    menu.forEach((item, index) => {
        let liItem = `
            <li class="list-group-item " id="item${index}" onclick="pageJump(this,id)">
                <span>${item}</span>
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
            </li>`
        $(selector).append(liItem)
    })
}
// 跳转不一样的页面
function pageJump(self, id) {
    if (id === "item0") {
        location.href = './administrator.html'
    }
    if (id === "item1") {
        location.href = './dormAdminManagement.html'
    }
    if (id === "item2") {
        location.href = './studentManagement.html'
    }
    if (id === "item3") {
        location.href = './dormManagement.html'
    }
    if (id === "item4") {
        location.href = './absenceRecord.html'
    }
    if (id === "item5") {
        location.href = './changePassword.html'
    }

}
// 点击样式的切换
function selectEffectToggle(elementNode){
    let arr = elementNode.parentNode.children
    arr.__proto__.forEach = Array.prototype.forEach
    arr.forEach(item => {
        $(item).removeClass("active")
    })
    $(elementNode).addClass("active")
}