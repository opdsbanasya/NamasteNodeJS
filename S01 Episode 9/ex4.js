const fs = require("fs");

const a = 530;

setImmediate(()=> console.log("setImmediate"));

Promise.resolve("Promise").then(console.log);

fs.readFile("data.txt", "utf-8", (err, data)=>{
    console.log("Secret data: ", data);
})

setTimeout(()=>{
    console.log("setTimeout");   
}, 0);

process.nextTick(() => {
    process.nextTick(() => console.log("inner process.nextTick"));

    console.log("process.nextTick")
})

function printA(){
    console.log("a = ", a);
}

printA();
console.log("Last Line");

/**
 * a =  530
 * Last Line
 * process.nextTick
 * inner process.nextTick
 * Promise
 * setTimeout
 * Secret data:  This is secret file
 * setImmediate
 */