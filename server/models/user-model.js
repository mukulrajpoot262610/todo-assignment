const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    todo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema, 'users')