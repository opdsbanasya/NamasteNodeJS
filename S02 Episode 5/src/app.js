const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    next();
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    next();
  },
  (req, res, next) => {
    console.log("Response 3 sent");
    next();
  },
  (req, res, next) => {
    console.log("Response 4 sent");
    res.send("Response 4");
  },
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
