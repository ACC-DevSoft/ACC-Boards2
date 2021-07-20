const expres = require('express');
const router = expres.Router();
const mongoose = require('mongoose');

const User = require('../models/user');
const Workspace = require('../models/workspace');
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');

router.post('/newWorkSpace/:id', Auth, async (req, res) => {
	const { id } = req.params;
	req.body._id = id;
	const validId = mongoose.Types.ObjectId.isValid(id);
	if (!validId) return res.status(401).send('Process failed: Invalid id');

	if (!req.body._id || !req.body.name)
		return res.status(400).send('Incomplete Data.');

	const user = await User.findById({ _id: req.body._id });

	// consultar los espacios de trabajo por usuario
	// const workSpaceById = await Workspace.find({Admin: req.body._id});
	const workSpaceById = await Workspace.find({ Admin: user._id });

	const workSpaceExist = await Workspace.findOne({ name: req.body.name });

	if (workSpaceExist)
		return res.status(400).send('the workSpace already exists');

	const workSpace = new Workspace({
		Admin: req.user._id,
		name: req.body.name,
		description: req.body.description,
		members: req.body.members,
		boards: req.body.boards,
		status: true,
	});
	const result = await workSpace.save();
	if (!result) return res.status().send('Failed to add workSpace');

	user.workSpacesId.push(result);
	await user.save();
	return res.status(200).send({ result });
});

router.get('/listWorkSpaces/:_id?', Auth, async (req, res) => {
	const workSpaces = await Workspace.find({ Admin: req.params['_id'] });

	if (!workSpaces) return res.status(401).send('No Work Spaces');
	return res.status(200).send({ workSpaces });
});

router.put('/updateWorkSpace', Auth, async (req, res) => {
	if (!req.body._id || !req.body.name)
		return res.status(400).send('Incomplete data');

	const validId = mongoose.Types.ObjectId.isValid(req.body._id);
	if (!validId) return res.status(400).send('Process Failed: Invalid Id.');

	if (req.body.description == ' ') {
		req.body.description = ' ';
	} else {
		req.body.description = req.body.description;
	}

	const workSpaceFind = await Workspace.findById(req.body._id);
	const workSpace = await Workspace.findByIdAndUpdate(req.body._id, {
		members: workSpaceFind.members,
		boards: workSpaceFind.boards,
		Admin: workSpaceFind.Admin,
		name: req.body.name,
		description: req.body.description,
		status: true,
	});

	const result = await workSpace.save();
	if (!result) return res.status(400).send('Failed to update work-Space');
	return res.status(200).send({ result });
});


router.put('/updateArrayBoards',  async (req, res) => {
	
	const { boards, workspaceId } = req.body;
	if( !boards || !workspaceId) return res.status(400).send('No boards or no workspaceId');

	 await Workspace.findByIdAndUpdate(workspaceId, {boards}, { new: true });

	 return res.status(200).send({ msg: 'Deleted board in workspaces'});

});

router.put('/updateArrayMembers',  async (req, res) => {
	
	const { boards, workspaceId } = req.body;
	if( !boards || !workspaceId) return res.status(400).send('No boards or no workspaceId');

	 await Workspace.findByIdAndUpdate(workspaceId, {boards}, { new: true });

	res.end('Deleted member');

});

router.delete('/deleteWorkSpace/:_id', async (req, res) => {
	const validId = mongoose.Types.ObjectId.isValid(req.params._id);
	if (!validId) return res.status(400).send('Process failed: Invalid id');

	const workSpace = await Workspace.findByIdAndDelete(req.params._id);
	if (!Workspace)
		return res.status(400).send('Procces failed: Work-Space no found');
	return res.status(200).send({ workSpace });
});

// members of workspace
router.post('/addMember/:username?', Auth, async (req, res) => {
	if (!req.body.username) return res.send('No hay nombre de usuario');

	const workSpace = await Workspace.findById(req.body._id);

	if (!workSpace) return res.send('no se encontro espacio de trabajo.');

	// search members
	const user = await User.findOne({ userName: req.body.username });
	if (!user) return res.status(400).send('No se encontro el nombre de usuario');

	workSpace.members.push(user);
	const result = await workSpace.save();
	if (!result) return res.status(400).send('No se pudo agregar el usuario');

	user.workSpacesId.push(result);
	await user.save();
	res.status(200).send('Usuario agregado con exito.');
});

module.exports = router;
