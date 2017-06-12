const mongoose = require("mongoose");

const WidgetSchema = require("./widget.schema.server");

const PageSchema = mongoose.Schema({
    _website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Website"
    },
    name: String,
    title: String,
    description: String,
    widgets: [
        WidgetSchema
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = PageSchema;