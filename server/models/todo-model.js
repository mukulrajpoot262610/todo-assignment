const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    tasks: [{
        name: { type: String },
        description: { type: String },
        isCompleted: { type: Boolean, default: false }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Todo", todoSchema, 'todos')