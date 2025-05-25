const fs = require("fs");

const a = 120

setImmediate(()=> console.log("setImmediate"));

Promise.resolve("Promise").then(console.log);

fs.readFile("./data.txt", "utf8", (err, data)=>{
    setTimeout(() => console.log("inner setTimeout"), 0);

    process.nextTick(() => {
        fs.readFile("./data.txt", "utf8", (err, data)=>{
            console.log("again Secret data: " + data)
        })
        console.log("inner process.nextTick")
    });

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
 * setImmediate
 * Secret data:
 * inner process.nextTick
 * inner setImmediate
 * inner setTimeout
 * again Secret data: 
 * 
 */