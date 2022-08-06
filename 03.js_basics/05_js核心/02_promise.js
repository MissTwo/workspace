function mi() {
    console.log("幂开始跑了");
    setTimeout(function () {
        console.log("幂到达终点了");

    }, 600);
}

function yan(callback) {
    console.log("嫣开始跑了");
    setTimeout(function () {
        console.log("嫣到达终点了");
        callback();
    }, 800);
}

function shi(callback) {
    console.log("诗开始跑了");
    setTimeout(function () {
        console.log("诗到达终点了");
        callback();
    }, 1000);
}

