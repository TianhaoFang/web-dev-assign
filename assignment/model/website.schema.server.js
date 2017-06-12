const mongoose = require("mongoose");

const WebsiteSchema = mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page"
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = WebsiteSchema;