/*
 $ @Author: lishuangling
 $ @Date: 2022-06-20 15:51:10
 $ @LastEditTime: 2022-06-20 16:54:39
 */
let html=document.documentElement;
let cursor=document.createElement('div');
cursor.style.cssText=` width: 20px;height: 20px;background-color: palevioletred;position:relative;`;
html.onmousemove=function(e){
    html.appendChild(cursor)
    let x=e.clientX-cursor.offsetHeight/2
    let y=e.clientY-cursor.offsetWidth/2
    cursor.style.left=x+"px"
    cursor.style.top=y+"px"
}
html.onmouseleave=function(e){
    html.remove(cursor)
}