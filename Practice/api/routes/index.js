var express = require('express');
var router = express.Router();
const User=require('../model/user');

router.get("/getusers", async (req, res) => {
  try {
    const users=await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post('/register', async(req, res)=>{
  const newUser= new User(req.body);
  try {
      const user=await newUser.save();
      res.send("user registered successfully!");
  } catch (error) {
      return res.status(400).json({error});
  }
})
module.exports=router