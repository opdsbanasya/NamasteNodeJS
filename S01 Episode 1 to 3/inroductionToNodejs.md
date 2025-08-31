# Episode-01 | Introduction to NodeJS

## **What?**

- Node.js is an `open-source`, `cross-platform`, `JavaScript runtime environment` that executes JavaScript code outside a web browser.
- Node.js is built on top of the `V8 JavaScript engine`, which is the engine that runs `Google Chrome`.
- Node.js uses an `event-driven`, `non-blocking I/O` model that makes it lightweight and efficient.
- Whenever there is JavaScript, there is Node.js.

## **Need?**

- Before node.js, there was `Apache HTTP Server` used to run server-side code, but it was `blocking I/O` model.
- `Ryan Dahl` (creator of Node.js) wanted to build a server that could handle many connections at the same time.
- Node.js is very fast because it uses the V8 engine, which is written in C++ and is very fast.

## **History**

- Node.js was written initially by `Ryan Dahl` in `2009`.
- Initially, Ryan Dahl uses `Firefox's SpiderMonkey` engine to run JavaScript code, but after 2 days he switched to `Google's V8 engine`.
- Initially, Ryan work independently. There is a company called `Joyent` which work similar, they try to use JavaScript on the server-side, very impressed with Ryan Dahl's work and they hired him.
- Now Ryan works with Joyent. In the starting phase, they used it internally. Ryan named it `Web.js` to build web servers. Later, he understood that Node is not limited to web servers; it can be used for any kind of application, and he named it `Node.js`.
- In 2010, `NPM` created by `Isaac Z. Schlueter`, it is a `package manager` for Node.js there anybody can publish their package. This is like a `web registry` for Node.js packages and very significant for the Node.js ecosystem.
- Initially, Node.js was supported only on `Linux` and `MacOS`, but in 2011, there was `Windows` support that was led by `Joyent` and `Microsoft`.
- In 2012, `Ryan Dahl` stepped down from the project and `Isaac` took over the project. Now, pace of development of Node.js `very slow` and chrome releases new version of V8 engine day by day.
- In 2014, A developer named `Fedor Indunty` created a `fork` of Node.js called `io.js` because he was not happy with the pace of development of Node.js. Now, there a `controversy` between Node.js and io.js. Joyent managing Node.js but is open source. Joyent was limiting the `release cycle`, so the development process became slow, and the node was going to `die`, it was not actively maintained.
- Now there 2 different versions of Node.js, `Node.js` and `io.js`, both have different release cycles and development versions, this messed up the Node.js ecosystem.
- In 2015, `Jayent` and `io.js` being merged and `Node.js Foundation` was created. Now Node.js is actively maintained by the Node.js Foundation.
- In 2019, there 2 commities `JavaScript Foundation` and `Node.js Foundation` merged and created the `OpenJS Foundation`.

---

[**Next**](./jsOnServer.md)