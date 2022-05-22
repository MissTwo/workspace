// 导航的操作
let headline=function(){
    let nav=document.querySelectorAll("#nav li")
    let list=document.querySelectorAll("#content .box")

    for (let i = 0; i < list.length; i++) {

        nav[i].addEventListener('click',function () {
            for (let j = 0; j < list.length; j++) {
                nav[j].className = '';
                list[j].className='box'
            }
            nav[i].className = 'active';
            list[i].className = 'on';
        })
    }

}
let carousel=function () {
    let pic=document.getElementById('#pic')
    setInterval(function () {

    })

}
headline()
// carousel()