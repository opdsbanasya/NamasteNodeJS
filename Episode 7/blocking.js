const crypto = require("crypto");
const fs = require("fs")

var a = 52664;
var b = 623484;

// sync function
crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512");

// async function
crypto.pbkdf2("paasword", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("key generated");
})

fs.readFile("./review.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})

function multiply(x, y){
    return x * y;
}

const res = multiply(a, b);
console.log("Multiplication result is: ", res);