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


## CommonJS module (cjs) VS ES6 module (ejs)
- **CommonJS module (cjs)**: It uses `module.exports` to export functions, variables or objects and `require` to import them. These are enabled by default in Node.js. 
- **ES6 module (ejs)**: It is used in browser. It uses `export` to export functions, variables or objects and `import` to import them. To enable it in Node.js, you need to use `type="module"` in `package.json` file.
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
