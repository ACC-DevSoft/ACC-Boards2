const Role = require("../models/role");

const scrumMaster = async (req, res, next) => {
    const role = await Role.findById(req.user.roleId);
    if(!role) return res.status(401).send("Process Failed: Role Not Found");

    if(role.name === "SCRUMMASTER") next();
    else return res.status(401).send("Process Failed: Unathotized User")
}

module.exports = scrumMaster;