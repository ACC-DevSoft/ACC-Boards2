const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");
const Role = require("../models/role");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Admin = require("../middleware/admin");
const { uploadImg } = require("../helper/uploads-img");

router.post("/registerUser", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.userName
  )
    return res.status(400).send("Incomplete data");

	
	let imageUrl = "";
	if (req.files) {
		try {
			if (req.files) imageUrl = await uploadImg(req.files, "users");
		} catch (error) {
			return res.status(400).json({ error });
		}
	}

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The user is already registered");

  let userNickname = await User.findOne({ userName: req.body.userName });
  if (userNickname)
    return res.status(400).send("The user is already registered");

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
    workSpacesId:[],
    assignedTaskId: [],
    status: true,
	img: imageUrl
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

router.get("/listUsers/:userName?", Auth, UserAuth, Admin, async (req, res) => {
	const users = await User.find({
		userName: new RegExp(req.params["userName"], "i"),
	})
		.populate("roleId")
		.exec();

	if (!users) return res.status(401).send("There are no users to list");
	return res.status(200).send({ users });
});

router.get("/loadUser/:_id", Auth, UserAuth, Admin, async(req, res) => {
  const user = await User.find({ 
    userName: new RegExp(userNamereq.params["userName"], "i")
  })
  .populate("id")
    .exec();
  if (!user) return res.status(401).send("Process failed: User not found");
  return res.status(200).send({ user });
});

router.put("/updateUser/", Auth, UserAuth, Admin, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.userName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.status ||
    !req.body.roleId
  )
    return res.status(401).send("Incomplete data");

  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.findOneAndUpdate(req.body.email, {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    status: req.body.status ,
  });

  if (!user) return res.status(401).send("Error while editing user");
  return res.status(200).send({ user });
});

router.put("/deleteUser", Auth, UserAuth, Admin, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.userName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(401).send("Incomplete data");

  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
    status: false,
  });

  if (!user) return res.status(401).send("Error while deleting user");
  return res.status(200).send({ user });
});

router.post("/registerAdmin", Auth, UserAuth, Admin, async (req, res) => {
  if (
    !req.body.name ||
    !req.body.userName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId
  )
    return res.status(401).send("Incomplete data");

  const checkId = mongoose.Types.ObjectId.isValid(req.body.roleId);
  if (!checkId) return res.status(401).send("Invalid id");

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The user is already registered");

  const hash = await bcrypt.hash(req.body.password, 10);

  user = new User({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId,
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
