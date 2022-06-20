let body = document.body;
let box = document.createElement("div");
box.className = "box";
body.onmousemove = function(e) {
    body.appendChild(box);
    let x = e.clientX;
    let y = e.clientY;
    box.style.left = x-25 + 'px';
    box.style.top = y-25 + 'px';
}
body.onmouseleave = function(e) {
    body.removeChild(box);
}

