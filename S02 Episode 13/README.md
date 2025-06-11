# Episode-12 | Ref, Populate and through process of writing APIs

## POST `/request/review/:status/:requestId` API

This API is used to update the status of a review request. It takes in a status and a request ID as parameters and updates the review request accordingly. There we check the status should be either `aceppted` or `rejected`. Also, request ID should be a exist, `loggedInUser` should be `toUser` and current status should be `interested`. If all conditions are met, the status is updated to the provided status.

```js
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      // Reading the data
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // validating status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status not allowed");
      }

      // requestId should be valid && loggedinUser === toUser && status = interested
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        throw new Error("Request not found");
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
);
```

## Security thought process for → POST vs GET

As a developer, think about you are a security guard of your database, and your job is that only authorized people can access your database, and data should be sanitized before submitting it to database. If you are not following this thought process, you will end up with a lot of security issues, there can be data leak, data corruption, and many more issues. So, always think about security first.

- **GET**: When you design GET API, you should think about the data that is being fetched. Make sure that the data doesn't contain any sensitive information like `username`, `password`, `email`, etc. Only send back response that is required for the client to display the data on UI. Also, make sure that the data is sanitized before sending it to the client. For example, if you are sending a list of users, make sure that you are not sending their passwords or any other sensitive information.
- **POST**: When you design POST API, you should think about the data that is being sent to the server. Make sure that the data is sanitized before sending it to the server. Also, make sure that the data is validated before saving it to the database. For example, users signup on your platform, then you should validate the data like `email` is valid or not, `password` is strong enough or not, etc. Also, make sure that the data is sanitized before saving it to the database. For example, `password` should be hashed before saving it to the database, all fields should be trimmed, and keep limit on the length of the fields.

> NEVER TRUST USER INPUT, ALWAYS VALIDATE AND SANITIZE IT BEFORE SAVING IT TO THE DATABASE.

## GET `/user/requests/received` API

This API is used to get list of requests that user received, Their user should be logged in with `toUserId` as `loggedInUser._id`. It will return the list of requests that user received, and status should be `interested`. It will return the list of requests that user received.

### Relation between 2 collections

Whenever user hits the API, user gets a list of requests that contains `toUserId`, not name or other information, but in the real world, a user can't understood a id, so we need to include their names and other information.

- **`ref`**: To solve this problem we define the relationship betweenboth collections by creating a reference using `ref` in mongoose. So, we can include the data from the other collection.

```js
const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User collection
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User collection
    required: true,
  },
  // other fields...
});
```

- **populate()**: Now, we can use `populate` method to include the data from the other collection. It will replace the `toUserId` and `fromUserId` with the actual user data. `populate` method takes the field names inside first collection and fields inside second collection that you want to populate, if you have not passed the fields from second, then it populate all fields from second collection.
    - Syntax:
    ```js
    // Field inside the array
    Model.find().populate("fieldName", [field1, field2, ...]);
    // or 
    // Field inside the string with space separated
    Model.find().populate("fieldName", "field1 field2 ...");
    ```

```js
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const pendingReqeusts = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName about gender age skills profilePhoto"
    );

    res.json({
      message: "All connection request fetched successfully",
      pendingReqeusts,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
```
## GET `/user/connections` API
This API is used to get list of connections, the logged `loggedInUser` can be `toUser` or `fromUser` and `status` should be `accepted`. There we will send the response, if `loggedInUser` is `toUser` then we send `fromUser` and if `loggedInUser` is `fromUser` then we send `toUser`. So, we can get the list of connections of logged in user.

```js
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate(
        "fromUserId",
        "firstName lastName about gender age skills profilePhoto"
      )
      .populate(
        "toUserId",
        "firstName lastName about gender age skills profilePhoto"
      );

    const data = connections.map((request) => {
      if (request.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return request.toUserId;
      } else {
        return request.fromUserId;
      }
    });

    res.json({
      message: "All connection request fetched successfully",
      data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
```