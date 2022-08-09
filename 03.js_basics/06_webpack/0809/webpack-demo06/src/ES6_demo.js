// import "@babel/polyfill";

export function t1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("时间到了");
        }, 1000);
    });
}

Object.assign({}, { a: 1, b: 2, c: 3 });

export async function t2() {
    await "";
}