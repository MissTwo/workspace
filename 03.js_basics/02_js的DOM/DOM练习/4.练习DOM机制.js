/*
 $ @Author: lishuangling
 $ @Date: 2022-06-17 18:36:14
 $ @LastEditTime: 2022-06-17 19:03:47
 */
let comment=document.getElementById('comment')
let submit=document.querySelector('#submit')
submit.addEventListener('click',() => {
    let value=comment.value
    value=value.trim()
    console.log(value);
})
