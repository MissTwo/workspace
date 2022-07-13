createMenu(managerMenu, ".list-group")

selectEffectToggle(document.querySelector("#item0"))
home($('.content-right'))
// 首页的清空及绘制
// 首页内容绘制方法
function home(elementNode) {
    elementNode.empty()
    elementNode.append(`<h2 style="text-align: center">欢迎您!宿舍管理员</h2>`)
}



