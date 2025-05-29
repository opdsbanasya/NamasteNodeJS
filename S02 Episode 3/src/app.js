const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//   res.send("Namaste MERN");
// });

app.use("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/namaste", (req, res) => {
  res.send("Namaste World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
