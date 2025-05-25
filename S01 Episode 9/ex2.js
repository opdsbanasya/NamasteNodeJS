const fs = require("fs");

const a = 100;

setImmediate(()=> console.log("setImmediate"));

Promise.resolve("Promise").then(console.log);

fs.readFile("./data.txt", "utf8", ()=>{
    console.log("File read");
})

setTimeout(()=>{
    console.log("setTimeout");   
}, 0);

process.nextTick(() => console.log("process.nextTick"))

function printA(){
    console.log("a = ", a);
}

printA();
console.log("Last Line");

/**
 * a = 100
 * Last Line
 * process.nextTick
 * Promise
 * setTimeout
 * setImmediate
 * File read
 */