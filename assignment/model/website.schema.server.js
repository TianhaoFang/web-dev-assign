const mongoose = require("mongoose");

const WebsiteSchema = mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    pages: [],
    dateCreated: Date
});

module.exports = WebsiteSchema;