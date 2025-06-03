# Episode-07 | Diving deep into API

## Sending Data to the Server
We can pass dynamic data to server using `?` query parameters. Let there is an API to create a user, we can pass the user data in the URL like this:
```shell
http://localhost:3000/signup?firstName=Aarav&lastName=Sharma
```
But this is not a good practice. Instead, we use the `body` of the request to send data to server. Inside the Postman, there is a `Body` tab where we can send data in various formats but the most common format os `JSON`, which is a lighweight data interchange format. To send data in JSON format, choose `raw` and select `JSON` from the dropdown. Now, we can send data like this:
```json
{
    "firstName": "Smriti",
    "lastName": "Mandhana",
    "email": "sm.mandhana@gmail.com",
    "password": "515621564646",
    "gender": "Female"
}
```

Whenever you hit the Send button the request will be sent to the server, we can read the data in the server from `body` object inside the request object. But this is JSON data and if you want to log it, you will get `undefined` because Server doesn't know how to parse the JSON data. To solve this we need a middleware that parses JSON data to JavaScript object. For that, express have a built-in middleware called `express.json()`. There can be multiple routes, so we define it by `app.use()`. We can use it like this:
```js
app.use(express.json());

app.post("/signup", (req, res) => {
    try{
        // Logic to create a user
        console.log(req.body); // This will log the JSON data as a JavaScript object
        res.send("User created successfully");
    } 
    catch(err){
        res.status(500).send("Internal Server Error");
    }
})
```

## Reading Data from the Database
When we create a user, we want to read the data from the database. When you reading the data from the database then you have to know which model you are using. In our case, we are using `User` model.
- **Get user by email → GET `/user` API**: To get user by email, we are using `model.find()` method that provided by Mongoose. It takes an object as an argument as a filter and returns an array of ducuments that match th filter. If you want to get a single document, you can use `model.findOne()` method that returns a single document that matches the filter. The code will look like this:
```js
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
```
- **Get all users → GET `feed` API**: To get all users, we can use the `model.find()` method with an empty object as a filter. It will return all the documents in the collection. The code will look like this:
```js
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
    res.status(400).send("Something went wrong");
  }
})
```

## Deleting Data from the Database
We are creating a `DELETE /user` API to delete a user from the database. We can use the `model.findByIdAndDelete()` method to delete a user by its ID. It takes the ID of the document as an argument and returns the deleted document. The code will look like this:
```js
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userId)
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})
```
## Updating Data in the Database
We are creating a `PATCH /user` API to update a user in the database. 
- **`Model.findByIdAndUpdate()`**: This method is used to update a document by its ID. It takes the ID of the document as the first argument and an object with the updated data as the second argument. The code will look like this:
```js
app.patch("/user", async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.body.userId, req.body);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})
```
- If you pass any other field that is not present in schema, it will be ignored.
- Also, there is an option parameter in the `findByIdAndUpdate()` method that can be used to return the updated document. There pass `{returnDocument: "after"}` or `{returnDocument: "after"}` as the third argument. The code will look like this:
```js
app.patch("/user", async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
      returnDocument: "before"
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})
```
- **`Model.updateOne()`**: This method is used to update a single document that matches the filter. It takes an object as the first argument as a filter and an object with the updated data as the second argument. The code will look like this:
```js
app.patch("/user", async (req, res) => {
  try {
    const user = await User.updateOne({email: req.body.email}, req.body);
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})
```
- **`Model.updateMany()`**: This method is used to update multiple documents that match the filter. It takes an object as the first argument as a filter and an object with the updated data as the second argument. The code will look like this:
```js
app.patch("/user", async (req, res) => {
  try {
    const user = await User.updateMany({gender: "Male"}, req.body);
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})
```