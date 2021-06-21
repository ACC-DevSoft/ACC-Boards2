const express = require("express");
const router = express.Router();
const Board = require("../models/board")
const Auth = require("../middleware/auth")
const User = require("../models/user")
// const Workspace = require("../models/workspace")

router.post("/create",Auth, async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.techleader || !req.body.workspace) {
    return res.status(400).send("Incomplete Data");
  }
  const user = await User.findOne({ name: req.body.techleader})
  if(!user) return res.status(400).send("User not found");
  // const workspace = await Workspace.findById(req.body.workspace)
  // if(!workspace) return res.status(400).send("Workspace not found");
  const board = new Board({
    // workspace: workspace._id,
    name: req.body.name,
    description: req.body.description,
    tasks:[],
    techleader: user._id,
    status:'to-do'
  })
  try{
    const saveboard = await board.save()
    res.status(200).send('board created')
    console.log(saveboard)
  } catch(err) {
    res.status(400).send("Error: board no create" + err)
  }
});

module.exports = router