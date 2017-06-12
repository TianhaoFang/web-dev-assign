const mongoose = require("mongoose");

module.exports = mongoose.model("Page", require("page.schema.server"));