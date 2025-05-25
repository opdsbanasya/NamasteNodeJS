# Episode-07 | Sync, Async and setTimeoutZero

## Synchronous Code
Sync code is simple JS there code executes line by line. It is blocking operation, and not good for I/O operations.
- Example: [sync.js](./sync.js)

```js
var a = 52664;
var b = 623484;

function multiply(x, y){
    return x * y;
}

const res = multiply(a, b);
console.log("Multiplication result is: ", res);
```

## Asynchronous Code
Async code is non-blocking code, it is good for I/O operations. It is used for network operations, file operations, etc.
- Example: [async.js](./async.js)

```js
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
```

- Whenever you run this code it executes in following order:
    - There you got first access to file system and https request, these are core modules of node.js.
    - Now JS engine comes to next and there is a read file operation, so it offloads this operation to libuv, now to JS engine is free to execute next line and libuv does the read file operation and will notify JS engine once it is done.
    - There is a setTimeout function, so JS engine will offload this operation to libuv and will notify JS engine once it is done.
    - There is a https request, so JS engine will offload this operation to libuv and will notify JS engine once it is done.
    - Now JS engine move to next line if there another code.
    - Ones libuv get results, gives back to JS engine and JS engine pushed into callstack to execute them.

### `fs.readFile` vs `fs.readFileSync`
If there `Sync` in the function name, it means it is synchronous function, and if there is no `Sync` in the function name, it means it is asynchronous function.

| fs.readFile | fs.readFileSync |
|-------------|-----------------|
| Async function | Sync function |
| Non-blocking to main thread | Blocking to main thread |
| Offloads to libuv, but getting data in async way | Reads data in sync way |
| Callback function | Returns data |
| Concept of callback function | No concept of callback function |

- **Main Thread**: Thread that executes JS code.

## Crypto module
It is node.js core module, used to create a key.
- [blocking.js](./blocking.js)

```js
const crypto = require("crypto");

// pbkdf2 -> Password based key derivation function 2
// block to main thread
crypto.pbkdf2Sync("password", "salt", 5000000, 50, "sha512");

// not block to main thread
crypto.pbkdf2("paasword", "salt", 5000000, 50, "sha512", (err, key) => {
    console.log("key generated");
})
```

- **Never use sync functions, because these block your main thread.**

## setTimeoutZero
when you pass `0` ms to setTimeout, JS offloads it to libuv, because it is a async operation. It have 0 ms, but still libuv can't push into callback because libuv can **push a operation into callstack only when callstack is empty**, mean after that JS engine has been executed all code.
- [setTimeoutZero.js](./setTimeoutZero.js)

```js
setTimeout(()=>{
    console.log("Call me as soon as possible");
}, 0);

console.log("Hello");

/* output
 * Hello
 * Call me as soon as possible
*/
```

- It executes aftfer 0 ms, after callstack is empty.