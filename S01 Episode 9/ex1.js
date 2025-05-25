const fs = require("fs")

const a = 100;

setImmediate(()=> console.log("setImmediate"));

fs.readFile("./data.txt", "utf8", ()=>{
    console.log("File read.");
})

setTimeout(()=>{
    console.log("setTimeout");   
}, 0);

function printA(){
    console.log("a = ", a);
}
printA();
console.log("Last Line");


/**
 * a = 100
 * Last Line
 * setTimeout
 * setImmediate
 * File read
 */