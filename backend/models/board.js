const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    workspace: { type: mongoose.Schema.ObjectId, ref: "user" },
    name: String,
    description: String,
    tasks: Array,
    techleader: { type: mongoose.Schema.ObjectId, ref: "user" },
    date: {type: Date, default: Date.now},
    status:String
})

const board = mongoose.model('board', boardSchema)

module.exports = board