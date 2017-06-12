const mongoose = require("mongoose");

const PageSchema = require("page.schema.server");

const WebsiteSchema = mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: String,
    description: String,
    pages: [
        PageSchema
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = WebsiteSchema;