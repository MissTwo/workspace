/*
 $ @Author: lishuangling
 $ @Date: 2022-06-17 18:36:14
 $ @LastEditTime: 2022-06-17 19:03:47
 */

// 第一题
let comment = document.getElementById('comment')
let submit = document.querySelector('#submit')
submit.addEventListener('click', () => {
    let value = comment.value
    value = value.trim()
    console.log(value);
})

// 第二题
let price = [8, 10, 12.5, 23]
let minus = document.querySelectorAll('.minus')
let num = document.querySelectorAll('.num')
let add = document.querySelectorAll('.add')
let goods = document.querySelector('.goods')
let cost = document.querySelector('.cost')
let itemTotal = document.querySelectorAll('.itemTotal')
let itemPrice = document.querySelectorAll('.price')
let a = 0, b = 0;
goods.innerHTML = 0
for (let i = 0; i < num.length; i++) {
    itemPrice[i].innerHTML = `${price[i]}`
    num[i].value = 0;
    minus[i].addEventListener('click', function () {
        if (Number(num[i].value) > 0) {
            num[i].value -= 1;
            calculateTotal()
        }
    })
    add[i].addEventListener('click', function () {
        num[i].value = 1 + Number(num[i].value);
        calculateTotal()
    })
    num[i].addEventListener('input', calculateTotal)
}
function calculateTotal() {
    let total = 0
    let sum = 0
    for (let i = 0; i < num.length; i++) {
        total += Number(num[i].value)
        let tmp = Number(num[i].value) * price[i]
        itemTotal[i].innerHTML = `${tmp}`
        sum += tmp
    }
    goods.innerHTML = `${total}`
    cost.innerHTML = `${sum}`
}

// 第三题
let markList = ["safas", "yty", "ethg", "uyjyu"]
let revise = document.querySelectorAll('.revise')
let content = document.querySelectorAll('.content')
let mark = document.querySelectorAll('.content label')
let item
for (let i = 0; i < content.length; i++) {
    mark[i].innerHTML = markList[i]
    revise[i].addEventListener('click', function () {
        if (revise[i].innerHTML == `修改`) {
            content[i].removeChild(mark[i])
            let input = document.createElement('input')
            content[i].appendChild(input)
            revise[i].innerHTML = `确认`
            item = document.querySelector('.content input')
        } else if (revise[i].innerHTML = `确认`) {
            markList[i]=item.value ;
            content[i].removeChild(item)
            let label = document.createElement('label')
            label.innerHTML=`${markList[i]}`
            content[i].appendChild(label)
            revise[i].innerHTML = `修改`

        }
    })

}
