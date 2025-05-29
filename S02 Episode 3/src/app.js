const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Namaste MERN");
});

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/namaste", (req, res) => {
  res.send("Namaste World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
