const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.get("/admin/getAllUsers", (req, res) => {
  console.log("Giving all user data access...");
  res.send("All user data accessed");
});

app.get("/admin/deleteUser", (req, res) => {
  console.log(`Deleting User ${req.query.username}...`);
  res.send(`User ${req.query.username} deleted...`);
});

/*
app.use(
  "/user",
  (req, res, next) => {
    console.log("Response 1 sent");
    next();
  },
  (req, res, next) => {
    console.log("Response 2 sent");
    res.send("Response 2")
    next();
  }
);
*/

app.get("/user/profile", (req, res)=>{
  console.log(`Giving access to ${req.query.username} profile...`);
  res.send(`User ${req.query.username} profile!!`);
})



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

