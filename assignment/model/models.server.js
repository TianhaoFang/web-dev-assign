const mongoose = require("mongoose");

let connectionString = "mongodb://127.0.0.1:27017/assign";

if(process.env.MONGODB_URI) { // check if running remotely
    connectionString = process.env.MONGODB_URI;
}

mongoose.connect(connectionString, {
    promiseLibrary: Promise
});

mongoose.Promise = Promise;

module.exports = {};