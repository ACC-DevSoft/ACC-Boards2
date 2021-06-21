const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/user");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

router.post("/registerUser", async (req, res) => {});

module.exports = router;
