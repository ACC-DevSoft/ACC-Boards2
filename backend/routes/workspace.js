const expres  = require('express');
const router = expres.Router();

const Workpace = require('../models/workspace');
const Auth = require("../middleware/auth");
const Admin = require("../middleware/admin")

router.post("/newWorkSpace",Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name) return res.status(400).send('Incomplete Data.');

    const workSpaceExist = await Workpace.findOne({name: req.body.name});
    if(workSpaceExist) return res.status(400).send("the workSpace already exists");

    const workSpace = new Workpace({
        Admin: req.user._id,
        name: req.body.name,
        description: req.body.description,
        members: req.body.members,
        boards: req.body.boards, 
        status: true,
    });
    const result = await workSpace.save();
    if(!result) return res.status().send("Failed to add workSpace");
    return res.status(200).send({ result });
});


module.exports = router;

