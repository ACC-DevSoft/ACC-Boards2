const mongoose = require('mongoose');
const moment = require('moment');

const roleSchema = new  mongoose.Schema({
    name: String,
    description: String,
    status:Boolean,
    date: {type:Date, default: Date.now}
});

const Role = mongoose.model("role", roleSchema);

module.exports = Role;