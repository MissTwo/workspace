selectEffectToggle(document.querySelector("#item1"))

// 宿舍管理员的数组对象
let dormManagerData = dormAdminManagement.dormAdminManagement
dormManagerData = [
    {'id': 1, 'name': '尹秀英', 'gender': '男', 'phoneNumber': '14807056888', 'dormitory': '第四宿舍楼', 'username': "bobkyp"},
    {'id': 2, 'name': '钱超', 'gender': '男', 'phoneNumber': '14413256876', 'dormitory': '第三宿舍楼', 'username': "uwin"},
    {'id': 3, 'name': '王霞', 'gender': '女', 'phoneNumber': '15276474434', 'dormitory': '第五宿舍楼', 'username': "ztkoqe"},
    {'id': 4, 'name': '赵娜', 'gender': '女', 'phoneNumber': '10271711025', 'dormitory': '第四宿舍楼', 'username': "zenn"},
    {'id': 5, 'name': '薛静', 'gender': '女', 'phoneNumber': '11378142619', 'dormitory': '第三宿舍楼', 'username': "csgiu"},
    {'id': 6, 'name': '董秀兰', 'gender': '男', 'phoneNumber': '12643546018', 'dormitory': '第三宿舍楼', 'username': "opgrcup"},
    {'id': 7, 'name': '朱明', 'gender': '女', 'phoneNumber': '18524782789', 'dormitory': '第二宿舍楼', 'username': "yrdniww"},
    {'id': 8, 'name': '王娜', 'gender': '男', 'phoneNumber': '13524425130', 'dormitory': '第五宿舍楼', 'username': "xtiyh"},
    {'id': 9, 'name': '钱涛', 'gender': '女', 'phoneNumber': '16125052156', 'dormitory': '第一宿舍楼', 'username': "zqejfka"},
    {'id': 10, 'name': '赵勇', 'gender': '男', 'phoneNumber': '14525182134', 'dormitory': '第二宿舍楼', 'username': "gloldg"}
]

// 初始化绘制表格
redrawDormAdminTable($('tbody'), dormManagerData)
// 搜索绑定点击事件
$('#search_btn').click(function () {
    searchDormManager(dormManagerData, $('input[name="dorm-manager_name"]').val(), $('input[name="dorm-manager_phoneNumber"]').val(), $("#gender option:selected").val(), $("#chooseResidence option:selected").val())
})


// 宿舍管理员表格信息的重绘制（清空再渲染）
function redrawDormAdminTable(elementNode, data) {
    elementNode.empty()
    data.forEach(item => {
        elementNode.append(
            `<tr id='row${item.id}'</>
                <td><input type="checkbox" value="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.gender}</td>
                <td>${item.phoneNumber}</td>
                <td>${item.dormitory}</td>
                <td>${item.username}</td>
                <td>
                    <input type="button" value="编辑" onclick="editRow('${item.id}')">
                    <input type="button" value="删除" onclick="deleteRow('${item.id}')">
                </td>
            </tr>`)
    })
}

// 搜索宿舍管理员信息方法封装
function searchDormManager(data, name, phoneNumber, gender, dormitory) {
    let filterData = data.slice(0)
    if (name != '') filterData = filterData.filter(item => item.name.indexOf(name) != -1)
    if (phoneNumber != '') filterData = filterData.filter(item => item.phoneNumber.indexOf(phoneNumber) != -1)
    if (gender != 0) filterData = filterData.filter(item => item.gender == gender)
    if (dormitory != 0) filterData = filterData.filter(item => item.dormitory == dormitory)
    redrawDormAdminTable($('tbody'), filterData)
}

// 批量删除


$('#delete-date').click(() => {
    batchDeletion(dormManagerData)


})
// 批量删除
function batchDeletion(data) {
    if (!confirm("确定要删除选中的这些信息吗？")) return
    $('td>input[type="checkbox"]:checked').__proto__.forEach = Array.prototype.forEach
    $('td>input[type="checkbox"]:checked').forEach(i => {
        data.splice(data.findIndex(item => i.value == item.id), 1)
        redrawDormAdminTable($('tbody'), data)
    })
    if ($('#select-all')) {
        $('#select-all').prop("checked", false);
    }
}