# Episode-02 | JS on Server

## **Server**

Server is a `remote` computer that receives `request` and `response back`. It is always connected to the `internet`. It is used to store `data` and `run` applications.

```
Client <----> Server
google.com <----> Server
```

- There is an `IP address` that points to a server. When you type `google.com` in the browser, it sends a request to the server, and the server sends back the response.
- Initially, JavaScript was the main language that was used inside the browser, but after `node.js`, JavaScript can also be used on the `server side`.
- The front-end and back-end both have different developers if you using other languages like `Java`, `C++`, `Python`, etc., but with `Node.js`, you can use JavaScript for both front-end and back-end, and there `MERN` and `MEAN` stack come into the picture.

## **JS engine**

- In `node.js`, there is `V8 engine` used, which is written in `C++`.
- The V8 engine was developed by `Google` and is used in `Google Chrome`.
- It is an open-source high-performance `JavaScript` and `WebAssembly` engine, used in Chrome and Node.js.
- V8 engine can be `embedded` into any C++ application.
- We write JavaScript code, which is a `high-level` language, and V8 engine took that code and converts it into `machine code` that can be executed by the computer.

```
JavaScript code <----> V8 engine (C++) <----> Machine code
```

### **V8 engine can execute JS code, so why Node.js?**

- `V8 engine` is a JS engine that follows `ECMAScript` standards. ECMAScript is a standard for scripting languages.
- Node.js gives powerful things (`APIs/modulus`) that make it powerful on the server side.
- Suppose you want to connect a `database` to server, there V8 engine can't do that, but this can be done by `APIs` given by Node.js.

```
---------------------------------
|           Server              |
|  ---------------------------  |
|  |  Node.js                 | |
|  |  ---------------------   | |
|  |  |    V8 Engine      |   | |
|  |  ---------------------   | |
|  |                          | |
|  |  ---------------------   | |
|  |  |    APIs/modulus   |   | |
|  |  ---------------------   | |
|  ---------------------------  |
---------------------------------
```

### **What does a V8 engine do, and why is it in C++?**

We understand JS code, and the V8 engine takes that code and converts it into machine code that can be executed by the computer.
| There we will see the whole process of how the V8 engine works in next few episodes.

---

<div class="flex justify-center gap-40 bg-gray-100 rounded-xl p-4">
  <a href="./inroductionToNodejs.md" class="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-200">
    Previous
  </a>
  <a href="./jsOnServer.md" class="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-200">
    Next
  </a>
</div>
