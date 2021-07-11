const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    workspace: {type: mongoose.Schema.ObjectId, ref: 'workspace'},
    name: String,
    description: String,
    tasks: [{type: mongoose.Schema.ObjectId, ref: 'task', default: []}],
    techleader: { type: mongoose.Schema.ObjectId, ref: "user" },
    status:String,
    date: {type: Date, default: Date.now},
})

const board = mongoose.model('board', boardSchema)

module.exports = board