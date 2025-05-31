const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send("Hello from server!");
});

app.get("/user", (req, res)=>{
  console.log("responded");
  res.send({name: "Pratik", city: "Jaipur"});
})

app.post("/user", (req, res)=>{
  res.send("User data saved to DB");
})

app.delete("/user", (req, res)=>{
  res.send("User account deleted");
})

app.put("/user", (req, res)=>{
  res.send({name: "Pratap", city: "Jaipur"});
})

app.patch("/user", (req, res)=>{
  res.send({city: "Alwar"});
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// String Patterns in Routing
app.get("/^\/ab[0-9]+c$/", (req, res)=>{
  console.log("responded");
  res.send({name: "Pratik", city: "Jaipur"});
})
// http://localhost:3000/ab2
