const mongoose = require('mongoose');
const moment = require('moment');

const workspaceSchema = new mongoose.Schema({
    Admin: String,
    name: String,
    description: String,
    members: [String],
    boards: [String], 
    status: Boolean,
    date: {type: Date, default: Date.now}
});

const workspace = mongoose.model("workspace", workspaceSchema);

module.exports = workspace;