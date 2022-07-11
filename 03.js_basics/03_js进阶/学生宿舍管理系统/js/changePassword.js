selectEffectToggle(document.querySelector("#item5"))

//     // 修改密码
//     function changePassword(elementNode) {
//     elementNode.empty()
//     let table = `ddd`
//     elementNode.append(table)
// }

`< div
className = "page" >
    < div > 一共 < span
id = "date-num" > < /span>条记录</
div >
< div >
< nav
aria - label = "Page navigation" >
    < ul
className = "pagination" >
    < li >
    < a
href = "#"
aria - label = "Previous" > 首页 < /a>
</li>
<li className="previous-page">
<a href="#" aria-label="Previous">上一页</a>
</li>
<li className='next-page'>
<a href="#" aria-label="Next">下一页</a>
</li>
<li>
<a href="#" aria-label="Next">尾页</a>
</li>
</ul>
</nav>
</div>
<div>
<select name="" id="pages">
<option value="5">5</option>
<option value="10">10</option>
<option value="15">15</option>
</select>
</div>
</div>`
let pagination = document.querySelector('.pagination')
let currentPage = 1
let pageSize = 0
let limit = 5
function init() {
    let pages = document.querySelector('#pages')
    pages.value = 5
    paintPage(books)
    creatPagination(books)
    pages.addEventListener('change', function () {
        limit = pages.value
        paintPage(books)
        creatPagination(books)
    })

}

init()
function creatPagination(list) {
    clearContent(pagination)
    let a = Math.ceil(list.length / limit)
    pageSize = a
    pagination.innerHTML = `
            <li>
                <a href="#" aria-label="Previous" onclick="jumpTo(1)">首页</a>
            </li>
            <li  class="previous-page" onclick="jumpToPrev()">
                <a href="#" aria-label="Previous">上一页</a>
            </li>
            <li class='next-page'>
                <a href="#" aria-label="Next" onclick="jumpToNext()">下一页</a>
            </li>
            <li>
                <a href="#" aria-label="Next" onclick="jumpTo(${pageSize})">尾页</a>
            </li>
            `
    let nextPage = document.querySelector('.next-page')
    for (let i = 1; i <= a; i++) {
        let item = `<li id='pages${i}'><a href="#" onclick="jumpTo(${i})">${i}</a></li>`
        nextPage.insertAdjacentHTML("beforebegin", item)
    }
}
function jumpTo(m) {
    currentPage = m
    paintPage(books)
    // creatPagination()
}

function jumpToPrev() {
    if (currentPage === 1) {
        return
    }
    jumpTo(currentPage - 1)
}

function jumpToNext() {
    if (currentPage === pageSize) {
        return
    }
    jumpTo(currentPage + 1)
}

// 分页(包扩了清空表格内容和重新绘制表格内容)
function paintPage(list) {
    let current = list.slice((currentPage - 1) * limit, currentPage * limit)
    clearContent(tbody)
    current.forEach(ele => {
        createRow(ele)
    })

}

function pagination(ele) {

}