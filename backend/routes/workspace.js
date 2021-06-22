const expres  = require('express');
const router = expres.Router();

const User = require('../models/user');
const Workspace = require('../models/workspace');
const Auth = require("../middleware/auth");

router.post("/newWorkSpace",Auth, async (req, res)=>{
    if(!req.body._id || !req.body.name) return res.status(400).send('Incomplete Data.');
    
    const user = await User.find();
    console.log(user);
    res.send(user);
    
    // consultar los espacios de trabajo por usuario
    // const workSpaceById = await Workspace.find({Admin: req.body._id});        
    const workSpaceById = await Workspace.find({Admin: req.body._id});
    console.log(workSpaceById);  
    res.send(workSpaceById);
    
    // const workSpaceExist = await  workSpaceById.indexOf(4);
    // .includes({name: req.body.name});
    const workSpaceExist = await Workspace.findOne({name: req.body.name});
    console.log(workSpaceExist);
    if(workSpaceExist) return res.status(400).send("the workSpace already exists");

    // const workSpace = new Workspace({
    //     Admin: req.user._id,
    //     name: req.body.name,
    //     description: req.body.description,
    //     members: req.body.members,
    //     boards: req.body.boards, 
    //     status: true,
    // });
    // const result = await workSpace.save();
    // user.members = user.members.concat(result._id);
    // await user .save(); 
    // if(!result) return res.status().send("Failed to add workSpace");
    // return res.status(200).send({ result });
});

router.get("/listWorkSpaces/:_id?", Auth, async (req, res) => {
    // const workSpaceById = await Workspace.find({Admin: req.body._id});
    // console.log(workSpaceById);
    // res.send(workSpaceById);

  const workSpaces = await Workspace.find({ Admin: new RegExp(req.params["_id"], "i") })
    .populate("","_id")
    .exec();
  if (!workSpaces) return res.status(401).send("No Work Spaces");
  return res.status(200).send({ workSpaces });
});


module.exports = router;

