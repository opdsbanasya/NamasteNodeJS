# Episode 4 | `module.exports` and `require()`

## Module

Module is a collection of JavaScript code which is private iteself. It can be shared with other modules using `module.exports`.

## require()

- `require()` is a function which is used to import modules. It is a built-in function in Node.js.
- It return whole code from a module to another module and if you execute the file there you import the module, it will execute the code of imported module.

## Import function from module

- **Problem**: let you have a function `calculateSum()` to sum 2 numbers inside `sum.js` module. Now you want to use this function inside `app.js`, but you can't use `calculateSum()` directly in `app.js`. The code will run but here can't access **functions**, **variables** or **objects** of another module beacuse modules protect their **functions** and **variables** to leak.

- **`module.exports`**: To use functions and variables, you need to export these functions and variables and also import them in another module. There is `module.exports` which is used to export functions, variables or objects from one module to another module and `require` is used to import them.
- **Example**: 
    - **sum.js**

    ```js
    function calculateSum(a, b) {
        console.log(a + b);
    }

    module.exports = calculateSum;
    ```

    - **app.js**:
    ```js
    const calculateSum = require("./sum.js")

    var ans = calculateSum(20,50);

    console.log(ans); // 70
    ```

- If there are multiple function and variable the you want to export from a module, than wrap all inside an obejct ot create a object and export it.
    - **sum.js**:
    ```js
    function calculateSum(a, b){
        return a+b;
    }

    var name = "Lenovo";

    //* When you have multiple functions and variables
    module.exports = {
        name: name,
        calculateSum: calculateSum
    };
    ```
    - also you can export like:
    ```js
    module.exports = { name, calculateSum }
    ```
    - **app.js**: if you don't write `.js` extension, it will work perfectly.
    ```js
    const obj = require("./sum")

    var ans = obj.calculateSum(20,50);
    console.log(ans);
    console.log(obj.name);
    ```
    - you can also import by destructuring, it provide better readability.
    ```js
    const { name, calculateSum } = require("./sum")
    ```

- **Why module protects their functions and variables?**
    - Module protects their functions and vars to avoid confilcts with other function and variable.
    - It also helps to avoid the overwriting of functions and variables.

- **What inside module and module.exports?**
    - **module**: It is a global object which is available in every module. It contains information about the current module like **path**, **filename**, **exports** etc.
    - **module.exports**: It is empty object there you can export functions, variables or objects.

## CommonJS module (CJS) VS ES6 module (ESM/MJS)
- **CommonJS module (CJS)**: It uses `module.exports` to export functions, variables or objects and `require` to import them. These are enabled by default in Node.js. 
- **ES6 module (ESM)**: It is used in browser. It uses `export` to export functions, variables or objects and `import` to import them. To enable it in Node.js, you need to use `type="module"` in `package.json` file.
```json
{
    "type": "module"
}
```

- **Example**:
    - **sum.js**:
    ```js
    export function calculateSum(a, b){
        return a+b;
    }

    export var name = "Lenovo";
    ```

    - also you can export like
    ```js
    export { name, calculateSum };
    ```

    - **app.js**: here must write the `.js` extension.
    ```js
    import { name, calculateSum } from "./sum.js"

    var ans = calculateSum(20,50);
    console.log(ans);
    console.log(name);
    ```

### Difference 

| **CommonJS Module (CJS)** | **ES Module(MJS/ESM)** |
| --- | --- |
| `module.exports` and `require()` | `export` and `import` |
| Enabled by default in Node.js | Enabled by using `type="module"` in `package.json` |
| Used in `Node.js` | Used in `React.js`, `Angular.js`, etc. |
| Used in Industry | Starndard |
| Syncronous | Asyncronous |
| Code run in non-strict mode | in strict mode |
| Ex.: `z = 10` run without error | Ex.: `z = 10` throw error |


## Module folder structure
- **Problem**: let you have multiple modules and you want to keep them in a separate folder. How you can do this?
- **Solution**: Create a folder and move all modules. Now create a `index.js` module which will import all modules and export them. Now you can import all modules using `require` or `import`.
- Let you have `sum.js` and `mutiply.js`
    - Create `calculation` folder, move [sum.js](./calculation/sum2.js) and [multiply.js](./calculation/multiply.js) inside it.
    - **index.js**: 
    ```js
    const calculateSum2  = require("./sum2.js");
    const multiply = require("./multiply.js");

    module.exports = { calculateSum2, multiply };
    ```

    - **app.js**: There `./calculation` is denotes the folder where `index.js` is located, you not need to write `index.js`.
    ```js
    const { calculateSum2, multiply } = require("./calculation")
    console.log("Sum 2 is: ", calculateSum2(21, 125));
    console.log("Multi is: ", multiply(50, 20));
    ```

### Why we follow this structure?
- We follow this structure to keep our code clean, organized and group all related modules in a single folder.
- Suppose you use these modules in **app.js** with a long path in require, but **app.js** don't need to understood file structure of your module.

### Importing a JSON file
You can import a json file by:
```js
const data = require("./data.json");

console.log(data);
```

## Built in modules in Node.js
- **util**: The util module is a core module in Node.js that provides a variety of utility functions for debugging, formatting, and working with objects. Utility functions are internal tools used to maintain and debug code.
    - **Example**:
    ```js
    const util = require("node:util");
    // or
    const util2 = require("util");
    ```
    - **util.format()**: It is used to format a string. It takes a string and arguments and returns a formatted string.
    ```js
    var txt = 'Congratulate %s on his %dth birthday!';
    var result = util.format(txt, 'Linus', 6);

    console.log(result);
    ```

