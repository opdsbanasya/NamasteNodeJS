const crypto = require("crypto")

process.env.UV_THREADPOOL_SIZE = 5;

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", ()=>{
    console.log("Key 1 generated");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", ()=>{
    console.log("Key 2 generated");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", ()=>{
    console.log("Key 3 generated");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", ()=>{
    console.log("Key 4 generated");
})
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", ()=>{
    console.log("Key 5 generated");
})