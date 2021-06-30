const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: String,
	description: String,
	img: String,
	board: { type: mongoose.Schema.ObjectId, ref: "board", required: true },
	editors: { type: Array, default: [] },
	date: { type: Date, default: Date.now },
	status: { type: String, default: "to-do" },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
