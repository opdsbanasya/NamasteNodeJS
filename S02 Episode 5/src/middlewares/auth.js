const adminAuth = (req, res, next)=>{
  const token = "xyz";
  const isAdmin = token === "xyz";
  if(!isAdmin){
    res.status(401).send("Unauthrized request!!!");
  } else {
    next();
  }
}

const userAuth = (req, res, next)=>{
  const token = "xyz";
  const isUser = token === "xyz";
  if(!isUser){
    res.status(401).send("Unauthrized request!!!");
  } else {
    next();
  }
}

module.exports = {adminAuth, userAuth};