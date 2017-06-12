const mongoose = require("mongoose");

module.exports = mongoose.model("Website", require("./website.schema.server"));