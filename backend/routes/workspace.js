const expres  = require('express');
const router = expres.Router();

const User = require('../models/user');
const Workspace = require('../models/workspace');
const Auth = require("../middleware/auth");
const Admin = require("../middleware/admin")

router.post("/newWorkSpace",Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name) return res.status(400).send('Incomplete Data.');
    
    const user = await User.findById({_id:req.body._id});
    
    // consultar los espacios de trabajo por usuario
    // const workSpaceById = await Workspace.find({Admin: req.body._id});        
    const workSpaceById = await Workspace.find({Admin: user._id});
  
    const workSpaceExist = await Workspace.findOne({name: req.body.name});
    console.log(workSpaceExist);
    if(workSpaceExist) return res.status(400).send("the workSpace already exists");

    const workSpace = new Workspace({
        Admin: req.user._id,
        name: req.body.name,
        description: req.body.description,
        members: req.body.members,
        boards: req.body.boards, 
        status: true,
    });
    const result = await workSpace.save(); 
    if(!result) return res.status().send("Failed to add workSpace");
    user.workSpacesId.push(result);
    await user .save(); 
    return res.status(200).send({ result });
});

router.get("/listWorkSpaces/:_id?", Auth, async (req, res) => {
  const workSpaces = await Workspace.find({ Admin: req.body._id });
  console.log(workSpaces);
 
  if (!workSpaces) return res.status(401).send("No Work Spaces");
  return res.status(200).send({ workSpaces });
});


module.exports = router;

