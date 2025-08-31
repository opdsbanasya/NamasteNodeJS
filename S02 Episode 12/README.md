# Episode-12 | Logical Database Query & Compound Indexing

## Connection request

To store connections request, we create a new collection. A collection in db define a particular thing. For example, just like user schema defines user. Follow the steps

- Create a new file `connectionRequest.js` in `models` folder
- Create a new schema `connectionRequestSchema` with the following fields:
  - `fromUserId`: userId of the user who sent the request
  - `touserId`: userId of the user who received the request
  - `status`: status of the request, can be `pending`, `accepted`, or `rejected`

```js
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        // Allowed values for status
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} not suppeted",
      },
    },
  },
  {
    timestamps: true,
  }
);
```

- **enum**: It is used to define a set of allowed values for a field. In this case, the `status` field can only have one of the values defined in the enum.

---

## POST `/request/send/:status/:toUserId` API

We creates an API to send connection requests to user. we make it dynamic whether the status can be `ignored` or `interested`.

```js
const requestRouter.post("/request/send/:status/:toUserId", async (req, res)=>{
    try {
        // Reading the Data
        const { status, toUserId } = req.params;
        const fromUserId = req.user._id;

        // Creating a new connection request instance
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        // Save the connection request to the database
        const request = await connectionRequest.save();

        res.json({
            message: "Connection request sent!",
            request
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
})
```

---

### Improvements in API
- Our API doesn't have validations here. Status can be ignored and interested, we don't want to allow any other status. So, we validate the status before creating a new connection request.

```js
const allowedStatus = ["ignored", "interested"];
const isStatusValid = allowedStatus.includes(status);

if (!isStatusValid) {
  throw new Error("Invalid request");
}
```

- Suppose there are two persons, one is Ajay and second is Sam. Let Sam already send a request to Ajay, and now Ajay want to send request to Sam, then we need to check the existing connection request before creating a new one. If there is already a request, we don't want to create a new one.

```js
const isRequestExist = await ConnectionRequest.findOne({
  $or: [
    { toUserId, fromUserId },
    { toUserId: fromUserId, fromUserId: toUserId },
  ],
});
```

- Also, chack whether the `toUserId` is present in the database or not. If not, we throw an error.

```js
const toUser = await User.findById(toUserId);
if (!toUser) {
  throw new Error("Invalid user id");
}
```

- **`schema.pre()`:** Also, check whether the `fromUserId` and `toUserId` are not same. If they are same, we throw an error. To check this, there are schema `pre()` method. It is kind of middleware that called every time, when schema is saved.

```js
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can't send request to self");
  }
  next();
});
```

- Now, our API is ready to use. We can send connection requests to users.

---

## MongoDB Query Operators

MongoDB provides various operators for querying documents.

### Logical Operators

| Operator | Description                                                                |
| -------- | -------------------------------------------------------------------------- |
| `$and`   | Combine multiple conditions; returns documents matching all conditions.    |
| `$or`    | Combine multiple conditions; returns documents matching any condition.     |
| `$not`   | Negate a condition; returns documents not matching the condition.          |
| `$nor`   | Combine multiple conditions; returns documents not matching any condition. |

---

### Comparison Operators

| Operator | Description                                                |
| -------- | ---------------------------------------------------------- |
| `$eq`    | Matches values equal to a specified value.                 |
| `$gt`    | Matches values greater than a specified value.             |
| `$gte`   | Matches values greater than or equal to a specified value. |
| `$in`    | Matches any value in a specified array.                    |
| `$lt`    | Matches values less than a specified value.                |
| `$lte`   | Matches values less than or equal to a specified value.    |
| `$ne`    | Matches values not equal to a specified value.             |
| `$nin`   | Matches none of the values in a specified array.           |

---

### Element Operators

| Operator  | Description                                    |
| --------- | ---------------------------------------------- |
| `$exists` | Matches documents with a specified field.      |
| `$type`   | Matches documents with a specified field type. |

---

### Evaluation Operators

| Operator      | Description                                            |
| ------------- | ------------------------------------------------------ |
| `$expr`       | Use aggregation expressions within the query language. |
| `$jsonSchema` | Validate documents against a JSON Schema.              |
| `$mod`        | Modulo operation on a field value.                     |
| `$regex`      | Matches values with a regular expression.              |
| `$text`       | Performs text search.                                  |
| `$where`      | Matches documents satisfying a JavaScript expression.  |

---

### Geospatial Operators

| Operator         | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `$geoIntersects` | Selects geometries intersecting a GeoJSON geometry.                   |
| `$geoWithin`     | Selects geometries within a bounding GeoJSON geometry.                |
| `$near`          | Returns objects near a point (requires geospatial index).             |
| `$nearSphere`    | Returns objects near a point on a sphere (requires geospatial index). |

---

### Array Operators

| Operator     | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| `$all`       | Matches arrays containing all specified elements.                     |
| `$elemMatch` | Matches documents if an array field matches all specified conditions. |
| `$size`      | Matches arrays of a specified size.                                   |

---

### Bitwise Operators

| Operator        | Description                                             |
| --------------- | ------------------------------------------------------- |
| `$bitsAllClear` | Matches values where all specified bit positions are 0. |
| `$bitsAllSet`   | Matches values where all specified bit positions are 1. |
| `$bitsAnyClear` | Matches values where any specified bit position is 0.   |
| `$bitsAnySet`   | Matches values where any specified bit position is 1.   |

---

### Projection Operators

| Operator     | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| `$`          | Projects the first array element matching the query condition.  |
| `$elemMatch` | Projects the first array element matching specified conditions. |
| `$meta`      | Projects the document's score from a `$text` operation.         |
| `$slice`     | Limits the number of array elements projected.                  |

---

### Miscellaneous Operators

| Operator   | Description                                  |
| ---------- | -------------------------------------------- |
| `$rand`    | Generates a random float between 0 and 1.    |
| `$natural` | Forces a forward or reverse collection scan. |

---

> For more details, refer to the [MongoDB Query and Projection Operators documentation](https://www.mongodb.com/docs/manual/reference/operator/query/).

---

## Indexing

- Indexes in MongoDB are special data structures that store a small portion of the collection's data set in an easy-to-traverse form. MongoDB indexes uses B-trees to store data, which allows for efficient querying and retrieval of documents.
- Support, there are 1000 users in your database and everybody sending request to each other then you have 10,00,000 records in your db and it makes slow to quering documents, to fix this we use index.

- **Use Cases**: If your application is repeatedly running queries on the same fields, you can create an index on those fields to improve performance.
- For example, you have one billion records and you try to search user by username to a record. If you put indexing at user name, it make querying faster. If you set `unique: true` then Mongodb keep index by default or set `index: true` at schema level.
```js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // This will create an index on the username field
  },
  // other fields...
});
```

- **Advantages**:

  - Faster query performance.
  - Efficient sorting and filtering of data.
  - Reduced disk I/O operations.

- **Disadvantages**:
  - Increased storage space usage.
  - Slower write operations (inserts, updates, deletes) due to index maintenance.
  - Complexity in managing indexes.

- **Compound Index**: Collect and sort data from 2 or more fields in each document in a collection. It is useful when you frequently query on multiple fields together. Example, in the connection request schema, we have `fromUserId` and `toUserId`, we can create a compound index on these two fields to speed up queries that filter by both fields.
```js
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });
```
Here, `1` indicates ascending order. If you want to create a descending index, you can use `-1`.
    
> For more details, refer to the [MongoDB Indexes documentation](https://www.mongodb.com/docs/manual/indexes/).

---

[**Previous**](../S02%20Episode%2011/README.md) | [**Next**](../S02%20Episode%2013/README.md)