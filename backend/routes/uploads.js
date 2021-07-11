const path = require("path");
const fs = require("fs");
const { Router } = require("express");
const mongoose = require("mongoose");
const { uploadImg, allowedCollections } = require("../helper/uploads-img");

const Task = require("../models/task");
const User = require("../models/user");

const router = Router();

router.get("/:collection/:id", async (req, res) => {
	const { collection, id } = req.params;

	const validId = mongoose.Types.ObjectId.isValid(id);
	if (!validId) return res.status(401).json("Process failed: Invalid id");

	let model;

	switch (collection) {
		case "users":
			model = await User.findById(id);
			if (!model)
				return res
					.status(400)
					.json({ message: `User is not exist with id ${id}` });

			break;

		case "tasks":
			model = await Task.findById(id);
			if (!model)
				return res
					.status(400)
					.json({ message: `Task is not exist with id ${id}` });

			break;

		default:
			return res.status(500).json({ message: "This is not valid yet" });
	}

	if (model.img) {
		const pathImg = path.join(__dirname, "../uploads", collection, model.img);

		if (fs.existsSync(pathImg)) return res.sendFile(pathImg);
	}

	const pathImg = path.join(__dirname, "../assets/no-image.jpg");

	res.sendFile(pathImg);
});

router.put("/:collection/:id", async (req, res) => {
	const { collection, id } = req.params;

	try {
		await allowedCollections(collection, ["users", "tasks"]);
	} catch (error) {
		return res.status(400).json({ error });
	}

	const validId = mongoose.Types.ObjectId.isValid(id);
	if (!validId) return res.status(401).json("Process failed: Invalid id");

	let model;

	switch (collection) {
		case "users":
			model = await User.findById(id);
			if (!model)
				return res
					.status(400)
					.json({ message: `User is not exist with id ${id}` });

			break;

		case "tasks":
			model = await Task.findById(id);
			if (!model)
				return res
					.status(400)
					.json({ message: `Task is not exist with id ${id}` });

			break;

		default:
			return res.status(500).json({ message: "This is not valid yet" });
	}

	if (model.img) {
		const pathImg = path.join(__dirname, "../uploads", collection, model.img);

		if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
	}

	let nameImg = "";
	if (req.files) {
		try {
			if (req.files) nameImg = await uploadImg(req.files, collection);
		} catch (error) {
			return res.status(400).json({ error });
		}
	}

	model.img = nameImg;

	await model.save();

	res.status(200).json(model);
});

module.exports = router;
