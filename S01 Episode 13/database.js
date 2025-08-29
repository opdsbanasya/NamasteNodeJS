const { MongoClient } = require("mongodb");

const url = "Your connection String";
const client = new MongoClient(url);
const dbName = "helloDharm";

async function main() {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("user");

  // todo: Create
  const data = {
    firstName: "Sanjay",
    lastName: "Saini",
    city: "Jaipur",
    role: "Student",
    number: "9685324858",
  };
  await collection.insertOne(data);

  // todo: Update
  await collection.updateOne(
    { number: "9685324858" },
    { $set: { fisrtName: "Ramkesh", city: "Dausa" } }
  );

  // todo: Read
  const users = await collection.find({}).toArray();
  console.log("All users: ", users);

  // todo: Delete
  await collection.deleteMany({ number: "9685324855" });

  // todo: Indexing
  const indexName = await collection.createIndex({ firstName: "Dharm Singh" });
  console.log("index name:", indexName);

  // todo: find all docs with filter
  const result = await collection.find({}).count();
  console.log(result);

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());