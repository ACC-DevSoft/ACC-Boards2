const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Board = require("../models/board");
const Auth = require("../middleware/auth");
const User = require("../models/user");
const Scrum = require("../middleware/scrumMaster");
const Workspace = require("../models/workspace");

router.post("/create/:id", Auth, async (req, res) => {
	const { id } = req.params;

	const validId = mongoose.Types.ObjectId.isValid(id);
	if (!validId) return res.status(401).send("Process failed: Invalid id");

	req.body.workspace = id;

	if (
		!req.body.workspace ||
		!req.body.name ||
		!req.body.description ||
		!req.body.techleader
	) {
		return res.status(400).send("Incomplete Dataaaaa");
	}

	const user = await User.findOne({ userName: req.body.techleader });
	if (!user) return res.status(400).send("User not found");

	const workspace = await Workspace.findById(req.body.workspace);
	if (!workspace) return res.status(400).send("Workspace not found");

	const board = new Board({
		workspace: workspace._id,
		name: req.body.name,
		description: req.body.description,
		tasks: [],
		techleader: user._id,
		status: "Active",
	});
	try {
		const saveboard = await board.save();
		// res.status(200).send('board created');
		// console.log(saveboard);
		await Workspace.findByIdAndUpdate(req.body.workspace, {
			$push: { boards: { $each: [saveboard] } },
		});
		// workspace.boards.push({saveboard});
		// await workspace.save();
		return res.status(200).send({ saveboard });
	} catch (err) {
		res.status(400).send("Error: board no create" + err);
	}
});

router.get("/list/:workspace?", async (req, res) => {
	if (!req.params.workspace) return res.status(400).send("Incomplete Data");
	const board = await Board.find({ workspace: req.params.workspace });
	if (!board || board == [])
		return res.status(400).send(" Not found boards on " + req.params.workspace);
	res.status(200).send(board);
});

router.put("/update", Auth, Scrum, async (req, res) => {
	if (!req.body.board) return res.status(400).send("Incomplete Data");
	let findBoard = await Board.findById(req.body.board);
	if (!findBoard) return res.status(400).send("Board no exist");
	if (req.body.name) findBoard.name = req.body.name;
	if (req.body.description) findBoard.description = req.body.description;
	if (req.body.techleader) {
		const user = await User.findOne({ name: req.body.techleader });
		if (!user) return res.status(400).send("User not found");
		findBoard.techleader = user._id;
	}
	if (req.body.status) findBoard.status = req.body.status;
	const board = await Board.findByIdAndUpdate(findBoard._id, {
		name: findBoard.name,
		description: findBoard.description,
		techleader: findBoard.techleader,
		status: findBoard.status,
	});
	if (!board) return res.status(400).send("Board no update");
	res.status(200).send("Board Update: " + board);
});

router.delete("/delete/:board", Auth, Scrum, async (req, res) => {
	if (!req.params.board) return res.status(400).send("Incomplete Data");
	const findBoard = await Board.findById(req.params.board);
	if (!findBoard) return res.status(400).send("Board no exist");
	const board = await Board.findByIdAndDelete(req.params.board);
	if (!board) return res.status(400).send("Board no delete");
	res.status(200).send("Board deleted " + board);
});

module.exports = router;
