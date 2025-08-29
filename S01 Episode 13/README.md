# Creating a database & MongoDB

MongoDB is a document-oriented NoSQL database used for high volume data storage.

## Way to use MongoDB

1. **Community Version**: Download and install MongoDB on your own system. It is known as self-managed MongoDB.
2. **Cloud Version**: Use MongoDB Atlas, a cloud-based MongoDB service. It is known as managed MongoDB. MongoDB on behalf of you, takes the DB, install it to server and give access to that platform to you.

## MongoDB Atlas

MongoDB Atlas is a cloud-based MongoDB service that provides all the features of MongoDB without the operational heavy lifting required for any new application. It is a fully managed database service that allows you to deploy, operate, and scale a MongoDB database in the cloud.

## Steps to create a MongoDB Atlas account

1. Go to the MongoDB Atlas website.
2. Click on the "Start Free" button.
3. Fill in the required details and click on the "Get Started" button.
4. Create cluster:
   - Choose plan
   - Give cluster a name
   - Choose cloud provider and region
   - Click on the "Create Cluster" button.
5. It gives you "username" and "password" to access the cluster.
6. To use the cluster, you need a mongoDB connection string. You can get it by clicking on the "Connect" button:
   - Choose a connection method
   - Choose driver
   - It gives you a connection string. Copy it and use it in your application.
   - Or Choose Compass to connect to the cluster using MongoDB Compass.
   - Create a `.js` file store the connection string and use it in your application.
   ```js
   const URI = "YOUR CONNECTION STRING";
   ```

## How to access Cluster

### 1. Using MongoDB Compass

- It is a GUI tool to connect to the MongoDB cluster. Install it.
- To connect to cluster follow the steps:
  - Open MongoDB Compass
  - Click on the "New Connection" button
  - Paste the connection string
  - Click on the "Save & Connect" button
  - You can create a new database by clicking in the `+` icon.
  - To add data click on `Add Data` button.
    - Write data in JSON format and click on the "Insert Document" button.
    - You can also import data from a file.

### 2. Using MongoDB Module

- You can also connect to the cluster using the MongoDB module. Install MongoDB module to connect to the cluter. Just hit the following command in your terminal:

```bash
npm install mongodb
```

- To connect follow the code:

```js
const { MongoClient } = require("mongodb");

const url = URI;
const client = new MongoClient(url);
const dbName = "HelloWorld";

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("user");
  // Operations

  return;
}
```

## CRUD Operations

- **Create**: Insert data into the database.

```js
await collection.insertOne(data);

// to insert multiple data
await collection.insertMany([data1, data2]);
```

- **Read**: Read data from the database.

```js
const users = await collection.find({}).toArray();
console.log("All users: ", users);
```

- **Update**: Update data in the database.

```js
await collection.updateOne(
  { number: "9685324858" },
  { $set: { firstName: "Ram", city: "Dausa" } }
);
```

- **Delete**: Delete data from the database.

```js
await collection.deleteMany({ number: "9685324855" });
```

- **Find all documents with filter**: return a cursor(pointer that references the documents of a collection) because you chain multiple operations.

```js
const result = await collection.find({ firstName: "Ram" });
console.log(result);
```
- **See [databse.js](./database.js) file for complete code**

## Resource
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [MongoDB npm API](https://mongodb.github.io/node-mongodb-native/Next/)