const mongoose = require("mongoose");

module.exports = mongoose.model("User", require("user.schema.server"));