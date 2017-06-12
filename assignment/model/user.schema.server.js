const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserSchema;