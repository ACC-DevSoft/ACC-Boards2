const express = require('express');
const router = express.Router();

const Auth = require("../middleware/auth");
const Admin = require("../middleware/admin");

const Role = require("../models/role");
router.post("/registerRole", Auth, Admin, async(req, res) =>{
    if(!req.body.name ||  !req.body.description)return res.status(400).send("Incomplete data.");

    const roleExist = await Role.findOne({name: req.body.name});
    if(roleExist) return res.status(400).send("the role already exists.");

    const role = new  Role({
        name : req.body.name,
        description : req.body.description,
        status: true,
    });

    const result = await role.save();
    if(!result) return res.status().send("Failed to register role");
    return res.status(200).send({ result });
});

router.get("/listRole", Auth, Admin, async (req, res) => {
  const role = await Role.find();
  if (!role) return res.status(401).send("No roles");
  return res.status(200).send({ role });
});

router.put("/updateRole", Auth,  Admin, async (req, res) =>{
    if(!req.body._id || !req.body.name  || !req.body.description) return res.status(400).send("Incomplete Data!");
    
    const role =  await Role.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
        description:req.body.description
    });
    if(!role) return res.status(400).send("Process Failed: Error editing  role.");
    return res.status(200).send({role});
});

router.put("/deactivateRole", Auth,  Admin, async (req, res)=>{
    if(!req.body._id || !req.body.name  || !req.body.description) return res.status(400).send("Incomplete data.");
    const role = await Role.findByIdAndUpdate(req.body._id,{
    name: req.body.name,
    description:req.body.description,
    status: false 
    });
    if(!role) return res.status(400).send("Process Failed: Error deleting role.");
    return res.status(200).send({role});
});

router.put("/activateRole", Auth,  Admin, async (req, res)=>{
    if(!req.body._id || !req.body.name  || !req.body.description) return res.status(400).send("Incomplete data.");
    
    const role = await Role.findByIdAndUpdate(req.body._id,{
    name: req.body.name,
    description:req.body.description,
    status: true 
    });
    if(!role) return res.status(400).send("Process Failed: Error deleting role.");
    return res.status(200).send({role});
});

module.exports = router;