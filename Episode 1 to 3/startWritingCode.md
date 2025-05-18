# Start Writing Code

There are 2 ways to write code in Node.js:
- Node REPL (Read-Eval-Print-Loop)
- Using a file

## Node REPL (Read-Eval-Print-Loop)
When you install Node.js, you get Node REPL. You can start Node REPL by typing `node` in the terminal. It is a great way to test your code and quickest way to run JavaScript code.

```bash
$ node
> console.log("Hello World")
Hello World
undefined
> 
```
- REPL is very simlar to the browser console, but difference is that it is running on the server side and browser console is running on the client side.
- REPL is very useful to test your code and to understand how JavaScript works.

## Using a file
- Create a file with `.js` extension.
- Write your code in that file.
- Run that file using `node filename.js`.

```javascript
// app.js

var name = "Sanjay Kumar";
console.log("Hello " + name);
```
```bash
$ node app.js
Hello Sanjay Kumar
```

## Global Object
1. **Global Objects in Browsers**:
   - In web browsers, the global object is the `window` object. Variables and functions defined with the `var` keyword become properties of this `window` object. The `window` object represents the browser's window and provides methods and properties to interact with the browser.
   - The `self` property is an alias for the `window` object, allowing references to the global scope.
   - The `frames` property is also an alias for the `window` object, primarily used to reference the collection of frames in the window.
   - The `this` keyword, when used in the global scope, refers to the global object (`window` in browsers). However, within functions or methods, its value depends on the context in which the function is called.

    ```javascript
    console.log(window); // It will print the window object
    console.log(this); // It will print the window object
    ```
   - Read More about [`this` keyword](https://www.freecodecamp.org/news/the-javascript-this-keyword-explained-with-examples/)
   
2. **Global Object in Node.js**:
   - In Node.js, the global object is named `global`. Unlike browsers, Node.js does not have a `window` object.

    ```javascript
      console.log(global); // It will print the global object
      console.log(this); // It will print an empty object
    ```

3. **Introduction of `globalThis`**:
   - To standardize the global object across different JavaScript environments (like browsers and Node.js), the `globalThis` object was introduced. It provides a consistent way to access the global object, regardless of the environment.
   ```bash
   $ node
   > console.log(globalThis);
   { global: [Circular], clearImmediate: [Function: clearImmediate], ... }
   ```