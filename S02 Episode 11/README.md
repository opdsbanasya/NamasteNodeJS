# Episode-11 | Diving into the API's and Express Router

## Express Router
Large scale applications have lot of APIs, if we put all the APIs into app.js, then i becomes difficult to manage. To solve this we group similar apis into a module and keep them separate and import these into app.js as middleware. To do all of this, express provides `Router` method there we create an different router to group all similar APIs. This is the good way to manage APIs in large scale applications.

Follow the below steps to create a router:
- List down the APIs that you want to group together.
- Create a new folder `src/routes`.
- Create a new file `auth.js` inside `src/routes`, there we will group all auth related APIs.
- Now write the following code in `auth.js`:
```javascript
const express = require('express');
const authRouter = express.Router();

module.exports = authRouter;
```
- Use authRouter with HTTP methods like `get`, `post`, `put`, `delete` etc. For example:
```javascript
authRouter.get('/login', (req, res) => {
    // Signup logic here
});
```
- Here `app.use()` is exact similar to `authRouter.use()`, but the difference is that `app.use()` is used to register middleware, while `authRouter.use()` is used to register routes.
- Also create all routes for all APIs and move all the APIs to their respective routes, also require all the middlewares and packeges.

## Using Router in `app.js`
To use routes in `app.js` require all the routes and use them as middleware. For example:
```javascript
const authRouter = require('./routes/auth');

app.use('/', authRouter);
```
- When I request comes to server for a specific route then express match one by one to all routes and the request handled by the matched route.

## POST `/logout` API
`/logout` API doesn't have a complex logic, just set cookies to `null` or clear the cookies, the user should be logged out.
```javascript
authRouter.post("/logout", (req, res)=>{
  res.clearCookie("token");
  // res.cookie("token", null, {expires: new Date(Date.now())})
  res.send("logout successful 📤")
})
```

In large scale applications, logic can be more complex and need to lot of things to clean.

## PATCH `/profile/edit` API
```js
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const data = req.body;

    // validate the data

    const {user} = req;

    // finding the user and updating their data
    const user1 = await User.updateOne({_id: user._id}, data);
    console.log(user1);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
```