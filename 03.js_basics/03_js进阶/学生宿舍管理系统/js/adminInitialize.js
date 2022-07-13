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

class Pagenation {
    constructor(currentPage,limit,data, parent, tableRender) {
        this.currentPage = currentPage;
        this.limit = limit;
        this.data = data.slice(0);
        this.tableRender = tableRender;
        this.pageSize =  Math.ceil(this.data.length / this.limit);
        this.parent = parent;
    }
    draw(){
        $('#select-all').prop('checked', false)
        this.parent.empty()
        // 当前展示的数据
        this.pageSize = Math.ceil(this.data.length / this.limit)
        this.parent.append(`<div>共<span id="data-num" class="label label-info"></span>条记录</div>
            <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li>
                            <a href="#" aria-label="Previous" onclick="pagenation.jumpTo(1)">首页</a>
                        </li>
                        <li class="previous-page" onclick="pagenation.jumpToPrev()">
                            <a href="#" aria-label="Previous">上一页</a>
                        </li>
                        <li class='next-page'>
                            <a href="#" aria-label="Next" onclick="pagenation.jumpToNext()">下一页</a>
                        </li>
                        <li>
                            <a href="#" aria-label="Next" onclick="pagenation.jumpTo(${this.pageSize})">尾页</a>
                        </li>
                    </ul>
                </nav>
            <div>
                <select name="" id="limit">
                </select>
            </div>`)

        // 数据数量展示
        $('#data-num').text(pagenation.data.length)
        // 数量范围
        for (let i = 5; i <=15; i+=5) {
            if(i===this.limit){
                $('#limit').append(`<option value="${i}" selected>${i}</option>`)
                continue
            }
            $('#limit').append(`<option value="${i}">${i}</option>`)
        }
        $('#limit').change(function () {
            limit = $('#limit').val()
            pagenation.limit=Number(limit)
            pagenation.draw()
        })
        for (let i = 1; i <= this.pageSize; i++) {
            if(i===this.currentPage){
                $('.next-page').before(`<li id='pages${i}' class="active"><a href="#" onClick="pagenation.jumpTo(${i})">${i}</a></li>`)
                continue
            }
            $('.next-page').before(`<li id='pages${i}'><a href="#" onClick="pagenation.jumpTo(${i})">${i}</a></li>`)
        }
        // 当前的数据
        let current = this.data.slice((this.currentPage - 1) * this.limit, this.currentPage * this.limit)
        this.tableRender(current)
    }
    // 上一页
    jumpToPrev() {
        if (this.currentPage === 1) return
        this.jumpTo(this.currentPage - 1)
    }
// 下一页
    jumpToNext() {
        if (this.currentPage === this.pageSize) return
        this.jumpTo(this.currentPage + 1)
    }

// 跳转那一页
    jumpTo(m) {
        this.currentPage = m
        this.draw(this.currentPage, this.limit, this.data)
    }
}