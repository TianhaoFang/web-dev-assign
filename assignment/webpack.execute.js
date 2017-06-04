module.exports = function (app) {
    const webpack = require("webpack");
    const compiler = webpack(require("./../webpack.config"));
    compiler.run((err, status) => console.log("webpack bundle success"));
};