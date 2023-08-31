const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tasks: [{
        name: { type: String },
        description: { type: String },
        isCompleted: { type: Boolean }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Todo", todoSchema, 'todos')