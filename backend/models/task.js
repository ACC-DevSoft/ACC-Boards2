const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: String,
	description: String,
	img: String,
	board: { type: mongoose.Schema.ObjectId, ref: "board", required: true },
	users: { type: Array, default: [] },
	date: { type: Date, default: Date.now },
	status: { type: Boolean, default: true },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
