const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");
const Role = require("../models/role");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

router.post("/registerUser", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.userName)
    return res.status(400).send("Incomplete data");

  let user= await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The user is already registered");

  let userNickname = await User.findOne({ userName: req.body.userName });
  if (userNickname) return res.status(400).send("The user is already registered");

  const role = await Role.findOne({ name: "USER" });
  if (!role)
    return res.status(400).send("Process failed: No role was assigned");

  const hash = await bcrypt.hash(req.body.password, 10);

  user = new User({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: hash,
    roleId: role._id,
    //assignedTask: task._id,
    //workSpaces: workSpace._id,
    status: true,
  });

  try {
    const result = await user.save();
    if (!result) return res.status(401).send("Failed to register user");
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Failed to register user");
  }
});

module.exports = router;
