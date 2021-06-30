const express = require("express");
const mongoose = require("mongoose");
const Auth = require("../middleware/auth");

const { uploadImg } = require("../helper/uploads-img");

const Board = require("../models/board");
const Task = require("../models/task");

const router = express.Router();

router.post("/addTask", async (req, res) => {
	if (!req.body.name || !req.body.description)
		return res.status(401).send("Data incomplete");
	let imageUrl = "";
	if (req.files) {
		try {
			if (req.files) imageUrl = await uploadImg(req.files, "tasks");
		} catch (error) {
			return res.status(400).json({ error });
		}
	}
	const board = await Board.findById(req.body.board);
	if (!board) return res.status(401).send("Board was not found");

	const task = new Task({
		name: req.body.name,
		description: req.body.description,
		img: imageUrl,
		board: req.body.board,
	});

	const saveTask = await task.save();
	board.tasks.push(saveTask);
	await board.save();
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

	const task = await Task.findByIdAndDelete(id);

	if (!task) return res.status(401).send("Process failed: Task not found");
	return res.status(200).json({ message: "Task deleted" });
});

module.exports = router;
