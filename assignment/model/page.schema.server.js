const mongoose = require("mongoose");

const PageSchema = mongoose.Schema({
    _website: {},
    name: String,
    title: String,
    description: String,
    widgets: [],
    dateCreated: Date
});

module.exports = PageSchema;