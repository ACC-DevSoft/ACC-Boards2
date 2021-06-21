const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    workspace: { type: mongoose.Schema.ObjectId, ref: "workspace" },
    name: String,
    description: String,
    tasks: Array,
    techleader: { type: mongoose.Schema.ObjectId, ref: "user" },
    date: {type: Date, default: new Date.now},
    status:'To-do'
})

const board = mongoose.model('board', boardSchema)

module.exports = board