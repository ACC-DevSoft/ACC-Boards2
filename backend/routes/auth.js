const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  if(!req.body.email || !req.body.password) return res.status(400).send("Incomplete data.");

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email or password");

  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!user.status || !hash)
    return res.status(400).send("Incorrect email or password");

  try {
    const jwtToken = user.generateJWT();
    userSend = {
      workSpacesId: userSend.workSpacesId, 
      id:user._id,
      assignedTaskId:user.assignedTaskId,
      name:user.name,
      userName:user.userName,
      email:user.email,
      status:user.status,
    }
    return res.status(200).send({ jwtToken , userSend});
  } catch (e) {
    return res.status(400).send("Login error");
  }
});


module.exports = router;