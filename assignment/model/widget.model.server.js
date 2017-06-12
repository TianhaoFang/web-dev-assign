const mongoose = require("mongoose");

module.exports = mongoose.model("Widget", require("./widget.schema.server"));