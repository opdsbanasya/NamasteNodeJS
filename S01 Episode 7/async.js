const fs = require("fs");
const https = require("https");

var a = 52664;
var b = 623484;

fs.readFile("./review.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})

setTimeout(()=>{
    console.log("call me after 5 second");
}, 5000);

https.get("https://dummyjson.com/products/1", (res)=>{
    console.log("Data fetched");
})

function multiply(x, y){
    return x * y;
}

const res = multiply(a, b);
console.log("Multiplication result is: ", res);
