# Episode-05 | Middlewares and Error Handling

If you have not write `res.send()` in your route handler, and if somebody hit the API endpoint, the server does not send any response, but on the postman, it show "Sending" and client goes to infinite loop till the timeout.

---

## Multiple Route Handlers

There can be multiple route handlers for a single route.

```javascript
app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    res.send("Response 1");
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    res.send("Response 2");
  }
);
```

- When you hit the API, it give response from the first route handler.
- If we remove `res.send() ` from first route handler, now you think that second route handler will be executed, and give response. But it will not by default. By doing this, you are creating a situation where the server does not send any response, and the client will wait indefinitely.
- Request handlers take an another argument `next`, which is a function that can be called to pass control to the next route handler in the stack.

```javascript
app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    next(); // Pass control to the next handler
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    res.send("Response 2");
  }
);
```

- If you write `res.send()` first and after that you call `next()` than response will be sent from the first route handler, and an error also will be thrown in the console beacause after sending the response, there remaining code will executes and there is `next()` function called that passes control to the next route handler, and second route handler will try to send response again, which is not allowed.

```javascript
app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    res.send("Response 1");
    next(); // Pass control to the next handler
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    res.send("Response 2");
  }
);
```

- If you write `next()` first and after that you call res.send() than response will be sent from the second route handler, and first route handler will not send any response, it try to send response but it will not be sent because the control is passed to the next route handler and it will throw an error in the console.

```javascript
app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    next(); // Pass control to the next handler
    res.send("Response 1");
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    res.send("Response 2");
  }
);
```

- If you put `next()` in the second route handler, and there is no third route handler, then it will throw an error in the console because express will not find any next route handler to pass control to.

```javascript
app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    next(); // Pass control to the next handler
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    next();
  }
);
```

- Also, you can wrap all route handlers inside the array or wrap some route handlers inside the array.

```javascript
app.use("/user", [
  (req, res, next) => {
    console.log("Response 1 sent");
    next(); // Pass control to the next handler
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    res.send("Response 2");
  },
]);

// or
app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("Response 1 sent");
      next(); // Pass control to the next handler
    },
  ],
  (req, res, next) => {
    console.log("Response 2 sent");
    res.send("Response 2");
  }
);
```

---

### Independent Route Handlers

There can be independent route handlers for a single route, which means that they do not depend on each other and can be executed independently.

```javascript
app.get("/user", (req, res, next) => {
  console.log("Response 1 sent");
  next(); // Pass control to the next handler
});
app.get("/user", (req, res) => {
  console.log("Response 2 sent");
  res.send("Response 2");
});
```

---

## Q. Why we have multiple route handlers?

- To habdle middlewares and errors.
- To handle different scenarios for the same route.

---

## Middlewares

Middleware functions are functions that not sending a response directly, but they can modify the request and response objects, end the request-response cycle, or call the next middleware function in the stack. They are executed sequentially in the order they are defined.

![Middleware Flow](https://www.scaler.com/topics/images/middleware-in-nodejs-1.webp)

```javascript
app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    next();
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    next();
  },
  // above two route handlers are middlewares

  (req, res, next) => {
    console.log("Response 3 sent");
    res.send("Response 3");
  }
);
```

- Suppose, as soon as a `GET` request come to `/user`, first of all it check whether there is route handler that mathces the request or not. Now it go through the chain of middlewares, and execute them one by one then finally it will send the response from the last route handler.

```
GET /user → It checks all the app.xxx(matching) route handlers → middleware chain → request handler → response
```

---

### Need of Middlewares

Suppose there are some APIs for admin and these have authentication, else anyone can access these APIs. To checking us the call is authorized or not, so need auth code for it, and there are multiple APIs that need auth code. So, we write same code again and again in each API that make code lengthy and hard to maintain. So, we can write this code in a middleware and use it in all APIs that need auth code.

```javascript
app.use("/admin", (req, res, next) => {
  const token = "xyz5";
  const isAdmin = token === "xyz";
  if (!isAdmin) {
    res.status(401).send("Unauthrized request!!!");
  } else {
    next();
  }
});

app.get("/admin/getAllUsers", (req, res) => {
  console.log("Giving all user data access...");
  res.send("All user data accessed");
});
// API: http://localhost:3000/admin/getAllUsers

app.get("/admin/deleteUser", (req, res) => {
  console.log(`Deleting User ${req.query.username}...`);
  res.send(`User ${req.query.username} deleted...`);
});
// API: http://localhost:3000/admin/deleteUser?username=Jai562
```

Middleware used to:
- Code Reusability & Modularity
- Request & Response Handling
- Authorization & Authentication
- Error Handling
- Pre-processing Requests

---

- Read more about middlewares in the [Express.js documentation](https://expressjs.com/en/guide/using-middleware.html).
- [Middleware Architecture](https://www.scaler.com/topics/middleware-in-nodejs/)

---

## Handling Errors

Suppose, there is an API `/getUserData`, first of all, everything that write do in `try-catch` block. But, still there are some unhandled errors that can occur. These errors handled in `/` (**Wildcard route handler**) at last. Pass `err` parameter on first place to route handler.

```javascript
app.get("/user/profile", (req, res) => {
  throw new Error("Ramdom error");
  res.send(`User ${req.query.username} profile!!`);
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(403).send("Something went wrong");
  }
});
```
