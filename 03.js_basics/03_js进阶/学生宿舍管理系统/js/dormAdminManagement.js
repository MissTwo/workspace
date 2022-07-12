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
    {'id': 10, 'name': '赵勇', 'gender': '男', 'phoneNumber': '14525182134', 'dormitory': '第二宿舍楼', 'username': "gloldg"},
    {'id': 11, 'name': '赵秀英', 'gender': '男', 'phoneNumber': '14807056888', 'dormitory': '第四宿舍楼', 'username': "bobkyp"},
    {'id': 12, 'name': '孙超', 'gender': '男', 'phoneNumber': '14413256876', 'dormitory': '第三宿舍楼', 'username': "uwin"},
    {'id': 13, 'name': '李霞', 'gender': '女', 'phoneNumber': '15276474434', 'dormitory': '第五宿舍楼', 'username': "ztkoqe"},
    {'id': 14, 'name': '周娜', 'gender': '女', 'phoneNumber': '10271711025', 'dormitory': '第四宿舍楼', 'username': "zenn"},
    {'id': 15, 'name': '吴静', 'gender': '女', 'phoneNumber': '11378142619', 'dormitory': '第三宿舍楼', 'username': "csgiu"},
    {'id': 16, 'name': '郑秀兰', 'gender': '男', 'phoneNumber': '12643546018', 'dormitory': '第三宿舍楼', 'username': "opgrcup"},
    {'id': 17, 'name': '王明', 'gender': '女', 'phoneNumber': '18524782789', 'dormitory': '第二宿舍楼', 'username': "yrdniww"},
    {'id': 18, 'name': '马娜', 'gender': '男', 'phoneNumber': '13524425130', 'dormitory': '第五宿舍楼', 'username': "xtiyh"},
    {'id': 19, 'name': '赵涛', 'gender': '女', 'phoneNumber': '16125052156', 'dormitory': '第一宿舍楼', 'username': "zqejfka"},
    {'id': 20, 'name': '李勇', 'gender': '男', 'phoneNumber': '14525182134', 'dormitory': '第一宿舍楼', 'username': "gloldg"},
]

// 分页的方法封装
let limit = 5
let currentPage = 1
let pagenation  = new Pagenation(currentPage, limit,dormManagerData,$('.mer-pagination'), redrawDormAdminTable)
window.pagenation = pagenation
pagenation.draw()

// 初始化绘制表格
// redrawDormAdminTable($('tbody'), dormManagerData)
// // 搜索后绘制表格
$('#search_btn').click(function () {
    searchDormManager(dormManagerData, $('input[name="dorm-manager_name"]').val(), $('input[name="dorm-manager_phoneNumber"]').val(), $("#gender option:selected").val(), $("#chooseResidence option:selected").val());
})


// // 宿舍管理员表格信息的重绘制（清空再渲染）
function redrawDormAdminTable( data) {
    let elementNode = $('tbody')
    elementNode.empty()
    data.forEach(item => {
        elementNode.append(
            `<tr id='row${item.id}'>
                <td><input type="checkbox" value="${item.id}"></td>
                <td>${item.id}</td>
                <td>${item.name}</td>,
                <td>${item.gender}</td>
                <td>${item.phoneNumber}</td>
                <td>${item.dormitory}</td>
                <td>${item.username}</td>
                <td>
                    <input type="button" value="编辑" onclick="editRow(${item.id})">
                    <input type="button" value="删除" onclick="deleteRow(${item.id})">
                </td>
            </tr>`)
    })
}

// 搜索宿舍管理员信息方法封装
function searchDormManager(data, name, phoneNumber, gender, dormitory) {
    pagenation.data= dormManagerData
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
    pagenation.data = dormManagerData
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
    for (let i = 0; i < dormManagerData.length; i++){
        if(dormManagerData[i].id===id){
            dormManagerData.splice(i, 1)
            break
        }
    }
    pagenation.draw()
}

// // // 批量删除方法封装(需要在表格绘制好之后才可以操作)
// function batchDeletion() {
//     // if ($('td>input[type="checkbox"]:checked').length != 0)
//
// }

// // 添加
// $('add-data').click(function () {
//     creatEdit()
// })

// 添加方法
// function creatEdit() {
//     console.log(1)
//     let a = `<tr id='rowid'>
//                 <td><input type="checkbox" value="id"></td>
//                 <td>id</td>
//                 <td><input type="text" placeholder="请输入姓名"></td>
//                 <td>
//                     <div class="form-group">
//                         <select id="gender">
//                             <option value="0">请选择性别</option>
//                             <option value="男">男</option>
//                             <option value="女">女</option>
//                         </select>
//                     </div>
//                  </td>
//                 <td><input type="phone" placeholder="请输入电话号码"></td>,
//                 <td>
//                     <div class="form-group">
//                         <select id="chooseResidence">
//                             <option value="0">请选择宿舍楼</option>
//                             <option value="第一宿舍楼">第一宿舍楼</option>
//                             <option value="第二宿舍楼">第二宿舍楼</option>
//                             <option value="第三宿舍楼">第三宿舍楼</option>
//                             <option value="第四宿舍楼">第四宿舍楼</option>
//                             <option value="第五宿舍楼">第五宿舍楼</option>
//                         </select>
//                     </div>
//                 </td>
//                 <td><input type="text" placeholder="请输入用户名"></td>
//                 <td>
//                     <input type="button" value="编辑" onclick="editRow(this)">
//                     <input type="button" value="删除" onclick="deleteRow(this)">
//                 </td>
//             </tr>`
//     $('tbody').append(a)
//
//
// }
//