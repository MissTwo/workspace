// import "@babel/polyfill";

export function t1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("时间到了")
        }, 1000);
    });
}

