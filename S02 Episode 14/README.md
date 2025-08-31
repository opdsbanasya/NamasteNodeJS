# Episode-14 | Building GET `/feed` API and Adding Pagination

## GET `/feed` API

This API is used to fetch all user profiles for feed to daiplay on `loggedInUser`'s feed, so user should be loggedIn to use this API. There are also some conditions:

- In feed data, we exclude the `user connections`, `sent or recieved requests`, `ignored people`, `user's own profile`.

```js
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // data reading
    const loggedInUser = req.user;

    // Finding user those are hidden from users feed
    const connections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    // Pushing all hidden user from feed in a set → bcoz set will not allow duplicate values
    const hiddenUserFromFeed = new Set();
    connections.map((user) => {
      hiddenUserFromFeed.add(user.fromUserId.toString());
      hiddenUserFromFeed.add(user.toUserId.toString());
    });

    // Finding all users except the hidden users and loggedInUser
    const usersForFeed = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select("firstName lastName about gender age skills profilePhoto");

    res.json({ message: "User feed Data", usersForFeed });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
```

## Adding Pagination

To add pagination in API, we will use `query params` to get the `page number` and `limit`(results per page), and then we will use `skip` and `limit` methods of mongoose to get the required data. We will also add some validation to check if the `page number` and `limit` are valid numbers. We chain the `skip` and `limit` methods to the query to get the required data.

```js
// Validating page number and results per page
const page = req.query.page || 1;
const results = (req.query.results > 3 && 3) || 10;
const skipResults = (page - 1) * results;

// Finding all users except the hidden users and loggedInUser
const usersForFeed = await User.find({
  $and: [
    { _id: { $nin: Array.from(hiddenUserFromFeed) } },
    { _id: { $ne: loggedInUser._id } },
  ],
})
  .select("firstName lastName about gender age skills profilePhoto")
  .skip(skipResults)
  .limit(results);
```


[**Previous**](../S02%20Episode%2013/README.md) | [**Next**](../S02%20Episode%2015-19/README.md)