const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: String,
	description: String,
	img: String,
	board: { type: mongoose.Schema.ObjectId, ref: "board", required: true },
	users: { type: Array, default: [] },
	status: { type: Boolean, default: true },
	date: { type: Date, default: Date.now },
});
const Task = mongoose.model("task", taskSchema);

module.exports = Task;
