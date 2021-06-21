const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	name: String,
	description: String,
	img: String,
	userId: { type: mongoose.Schema.ObjectId, ref: "user" },
	date: { type: Date, default: Date.now },
	status: { type: Boolean, default: true },
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
