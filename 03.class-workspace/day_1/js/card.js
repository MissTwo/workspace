// 事件四要素：1.事件源 2.事件类型  3.事件函数 4.事件对象
window.onload=function(){
    let list=document.querySelectorAll('#menu li')
    let content=document.querySelectorAll('#content p')
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('mouseover',function(){
            for (let j = 0; j < list.length; j++) {
                list[j].className=''
                content[j].className=''
            }
            list[i].className='active'
            content[i].className='on'
        })
        
    }
}