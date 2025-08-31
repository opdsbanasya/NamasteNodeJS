const fs = require("fs");

const a = 120

setImmediate(()=> console.log("setImmediate"));

Promise.resolve("Promise").then(console.log);

fs.readFile("./data.txt", "utf-8", (err, data)=>{
    setTimeout(() => console.log("inner setTimeout"), 0);

    process.nextTick(() => console.log("inner process.nextTick"));

    setImmediate(()=> console.log("inner setImmediate"));

    console.log("Secret data: ", data);
})

setTimeout(() => console.log("setTimeout"), 0);

process.nextTick(() => console.log("process.nextTick"))

function printA(){
    console.log("a = ", a);
}

printA();
console.log("Last Line");

/**
 * a = 120
 * Last Line
 * process.nextTick
 * Promise
 * setTimeout
 * Secret data: 
 * inner process.nextTick
 * setImmediate
 * inner setImmediate
 * inner setTimeout
 */