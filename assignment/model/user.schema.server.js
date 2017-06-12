const mongoose = require("mongoose");
const User = require("./user.model.server");

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website"
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserSchema;