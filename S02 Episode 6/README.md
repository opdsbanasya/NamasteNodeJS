# Episode-06 | Database, Schema, and Models in Mongoose

## Connecting database to our project

First, we need to create a cluster in MongoDB Atlas and get the connection string. For this follow the [S01 Episode 13](../S01%20Episode%2013/README.md). After that follow the steps below:

- Create a `src/config` folder and keep all the configuration files inside it.
- Create a `database.js` file inside the `src/config` folder.
- Now, install the `mongoose` module to connect to the MongoDB cluster. Just hit the following command in your terminal:

```bash
npm install mongoose
```

- Now, `require` the mongoose module in the `database.js` file and connect to the Database using the connection string you got from MongoDB Atlas. The code will look like this:

```js
const mongoose = require("mongoose");

const URI = "REPLACE_WITH_YOUR_CONNECTION_STRING";

const connetDB = async () => {
  await mongoose.connect(URI);
};

connetDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed", err));
```

- Now, require the `database.js` file in your `app.js` file to connect to the database when the server starts

```js
require("./config/database");
```

- Also, add `/devTinder` in your URI connection string to create a database with the name `devTinder`. The connection string will look like this:

```js
const URI = "mongodb+srv://<username>:<password>@cluster.mongodb.net/devTinder";
```

- Remember, when your database connected to the application then your app should start listening to the port. To do this, export `connectDB` function from the `database.js` file and call it in the `app.js` file before starting the server:

  - database.js

    ```js
    const mongoose = require("mongoose");

    const URI = "REPLACE_WITH_YOUR_CONNECTION_STRING";

    const connetDB = async () => {
      await mongoose.connect(URI);
    };

    exports.module = { connetDB };
    ```

  - app.js

    ```js
    const express = require("express");
    const { connetDB } = require("./config/database");
    const app = express();

    connetDB()
      .then(() => {
        console.log("Connection established!");

        app.listen(3000, () => {
          console.log("Server is running on port 3000");
        });
      })
      .catch((err) => {
        console.log("error occured");
      });
    ```

---

## Creating a Schema and Model
A schema is an idendity for a collection that defines the structure of the ducuments in that collection. Ex.- Creating a `user` schema mean defining a user (What are the fields in user document).

Following the steps to create a schema and model in Mongoose:
- Create a `src/models` folder to keep all the models.
- Create a `user.js` file inside the `src/models` folder to define the user schema.
- In the `user.js` file, require the `mongoose` module and create a schema for the user. The code will look like this:
```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    // There can be many more fields like email, password, etc.
})
```
- To create a user model, use the `mongoose.model()` method and pass the schema as the second argument. The code will look like this:
```js
const User = mongoose.model("user", userSchema);
module.exports = User;
```
- Remember, for the convention, model name should start with a capital letter.

## Creating a `/signup` API
Now, we are going to create our first `POST` API `/signup` for our project `devTinder`. This API will create a new user in the database. Follow the steps below to create the API:
- Create a dummy data for the user in the `app.js` file. It will be temporary data to test the API.
- Now, require the `User` model in the `app.js` file.
- Create a `/singup` `POST` API
- Create an instance of the `User` model and pass the dummy data to it.
- Save the user to the database using the `save()` method and it will return a promise, so handle it.
```js
const User = require("./models/user");

app,post("/signup", async (req. res)=>{
    const user = new User({
        firstName: "John",
        lastName: "Doe"
    });

    await user.save();
    res.send("User created successfully");  
});
```
- When you hit the `/signup` API, it add user to the database with the dummy data.
- MongoDB Atlas will create a database with the name `devTinder` and a collection with the name `users` (plural of model name) and add the user document to it.
- Also, MongoDB Atlas will create 2 fields:
    - `_id`: A unique identifier for the document.
    - `__v`: A version key to track the document version.
- There, instead of dummy data, you can pass data with API request by query params