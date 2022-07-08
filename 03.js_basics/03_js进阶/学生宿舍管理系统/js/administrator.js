selectEffectToggle(document.querySelector("#item0"))
home($('.content-right'))

// 首页的清空及绘制
function home(elementNode) {
    elementNode.empty()
    let title = `<h2 style="text-align: center">欢迎您!系统管理员</h2>`
    elementNode.append(title)
}


//
//     // 绘制学生管理
//     function studentManagement(elementNode) {
//     elementNode.empty()
//     let table = `dtert`
//     elementNode.append(table)
// }
//
//     // 绘制宿舍楼管理
//     function dormManagement(elementNode) {
//     elementNode.empty()
//     let table = `deeee`
//     elementNode.append(table)
// }
//
//     // 缺勤记录
//     function absenceRecord(elementNode) {
//     elementNode.empty()
//     let table = `ddfs`
//     elementNode.append(table)
// }
//
//     // 修改密码
//     function changePassword(elementNode) {
//     elementNode.empty()
//     let table = `ddd`
//     elementNode.append(table)
// }
