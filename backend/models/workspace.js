const mongoose = require('mongoose');
const moment = require('moment');

const workspaceSchema = new mongoose.Schema({
    Admin: {type: mongoose.Schema.ObjectId, ref: 'user'},
    name: String,
    description: String,
    members: [{type:Object, ref: 'user'}],
    boards: [{type:Object, ref: 'board'}], 
    status: Boolean,
    date: {type: Date, default: Date.now}
});

const workspace = mongoose.model("workspace", workspaceSchema);

module.exports = workspace;