const express = require("express");
const router = express.Router();
const Auth = require("../middleware/auth")

const multiparty = require("connect-multiparty");
const mult = multiparty();
const fs = require("fs");
const path = require("path");
const moment = require("moment");

// const User = require("../models/users");
const Task = require("../models/task");

const UploadImg = require("../middleware/file-img");

router.post("/addTask", Auth, [ mult, UploadImg], async (req, res) => {
	if (!req.body.name || !req.body.description)
		return res.status(401).send("Data incomplete");
	let imageUrl = "";
	let reqImg = req.files.image;
	if (req.files !== undefined && reqImg.type) {
		const url = req.protocol + "://" + req.get("host") + "/";
		let serverImg = "./uploads/" + moment().unix() + path.extname(reqImg.path);
		fs.createReadStream(reqImg.path).pipe(fs.createWriteStream(serverImg));
		imageUrl = url + "uploads/" + moment().unix() + path.extname(reqImg.path);
	}
	// const user = await User.findById(req.user._id);
	// if (!user) return res.status(401).send("User not authenticated");

	const task = new Task({
		// userId: user._id,
		name: req.body.name,
		description: req.body.description,
		img: imageUrl,
	});

	const saveTask = await task.save();
	return res.status(200).send({ saveTask });
});



router.get("/getTasks", Auth, async (req, res) => {
	const tasks = await Task.find({ status: true });
	if (!tasks) return res.status(401).send("There are not tasks");
	return res.status(200).send({ tasks });
});

module.exports = router;
