const express = require("express");
const mongoose = require("mongoose");
const Auth = require("../middleware/auth");

const multiparty = require("connect-multiparty");
const mult = multiparty();
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const Board = require("../models/board");
const Task = require("../models/task");

const UploadImg = require("../middleware/file-img");

const router = express.Router();

router.post("/addTask", [Auth, mult, UploadImg], async (req, res) => {
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
	const board = await Board.findById(req.body.board);
	if (!board) return res.status(401).send("Board was not founded");

	const task = new Task({
		name: req.body.name,
		description: req.body.description,
		img: imageUrl,
		board: req.body.board,
	});

	const saveTask = await task.save();
	return res.status(200).send({ saveTask });
});

router.get("/getTasks", Auth, async (req, res) => {
	const tasks = await Task.find({ status: true });
	if (!tasks) return res.status(401).send("There are not tasks");
	return res.status(200).send({ tasks });
});

router.put("/updateTask/:id", Auth, async (req, res) => {
	const { id } = req.params;
	const { _id, status, date, ...data } = req.body;

	const validId = mongoose.Types.ObjectId.isValid(id);
	if (!validId) return res.status(401).send("Process failed: Invalid id");

	const task = await Task.findByIdAndUpdate(id, data, { new: true });

	res.status(200).json({ task });
});

router.delete("/deleteTask/:id", Auth, async (req, res) => {
	const { id } = req.params;

	const validId = mongoose.Types.ObjectId.isValid(id);
	if (!validId) return res.status(401).send("Process failed: Invalid id");

	const task = await Task.findByIdAndUpdate(
		id,
		{ status: false },
		{ new: true }
	);

	res.status(200).json({ task });
});

module.exports = router;
