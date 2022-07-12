selectEffectToggle(document.querySelector("#item2"))
let studentManagement = Mock.mock({
    "studentManagement|100": [
        {
            "id|+1": 1,
            "studentID|+1":20220000,
            "name": "@cname",
            "gender|1": ["男", "女"],
            "phoneNumber": /^1\d{10}/,
            "dormitory|1": ["第一宿舍楼", "第二宿舍楼", "第三宿舍楼", "第四宿舍楼", "第五宿舍楼"],
            "dormitoryNumber|100-599": 100,
        }
    ]
})
// 宿舍管理员的数组对象
let studentManagementData = studentManagement.studentManagement

// // 宿舍管理员表格信息的重绘制（清空再渲染）
function redrawDormAdminTable( data) {
    let elementNode = $('tbody')
    elementNode.empty()
    data.forEach(item => {
        elementNode.append(
            `<tr id='row${item.id}'>
                <td><input type="checkbox" value="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.studentID}</td>,
                <td>${item.name}</td>
                <td>${item.gender}</td>
                <td>${item.phoneNumber}</td>
                <td>${item.dormitory}</td>
                <td>${item.dormitoryNumber}</td>

                <td>
                    <input type="button" value="编辑" onclick="editRow(${item.id})">
                    <input type="button" value="删除" onclick="deleteRow(${item.id})">
                </td>
            </tr>`)
    })
}


// 分页的方法封装
let limit = 5
let currentPage = 1
let pagenation  = new Pagenation(currentPage, limit,studentManagementData,$('.mer-pagination'), redrawDormAdminTable)
window.pagenation = pagenation
pagenation.draw()

// 初始化绘制表格
// redrawDormAdminTable($('tbody'), studentManagementData)
// // 搜索后绘制表格
$('#search_btn').click(function () {
    searchDormManager(studentManagementData, $('input[name="dorm-manager_name"]').val(), $('input[name="dorm-manager_phoneNumber"]').val(), $("#gender option:selected").val(), $("#chooseResidence option:selected").val());
})

// 搜索宿舍管理员信息方法封装
function searchDormManager(data, name, phoneNumber, gender, dormitory) {
    pagenation.data= studentManagementData
    if (name != '') pagenation.data = pagenation.data.filter(item => item.name.indexOf(name) != -1)
    if (phoneNumber != '') pagenation.data = pagenation.data.filter(item => item.phoneNumber.indexOf(phoneNumber) != -1)
    if (gender != 0) pagenation.data = pagenation.data.filter(item => item.gender == gender)
    if (dormitory != 0) pagenation.data = pagenation.data.filter(item => item.dormitory == dormitory)
    pagenation.currentPage=1
    pagenation.draw()
}

// 批量删除点击事件绑定
$('#delete-data').click(() => {
    if (!confirm("确定要删除选中的这些信息吗？")) return
    $('td>input[type="checkbox"]:checked').__proto__.forEach = Array.prototype.forEach
    $('td>input[type="checkbox"]:checked').forEach(i => {
        deleteFromData(Number(i.value))
    })
    if ($('#select-all')) $('#select-all').prop("checked", false);
})
// // 重置按钮，绘制所有的数据
$('#reset_btn').click(() => {
    pagenation.data = studentManagementData
    pagenation.currentPage=1
    pagenation.draw()
})

// // 删除每一行的操作
function deleteRow(id) {
    if (!confirm("确定要删除选中的这些信息吗？")) return
    deleteFromData(id)
}
// 批量删除
function deleteFromData(id){
    for (let i = 0; i < pagenation.data.length; i++){
        if(pagenation.data[i].id===id){
            pagenation.data.splice(i, 1)
            break
        }
    }
    for (let i = 0; i < studentManagementData.length; i++){
        if(studentManagementData[i].id===id){
            studentManagementData.splice(i, 1)
            break
        }
    }
    pagenation.draw()
}
