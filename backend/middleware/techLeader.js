const Role = require("../models/role")

const techLeader = async (req, res, next) => {
    const role = await Role.findById(req.user.roleId);
    if(!role) return res.status(401).send("Process Failed: Role Not Found");

    if(role.name === "TECHLEADER") next();
    else return res.status(401).send("Process Failed: Unathorized User")
}

module.exports = techLeader;