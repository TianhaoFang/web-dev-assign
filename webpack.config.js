let path = require("path");
let glob = require("glob");

module.exports = {
    entry: getEntryPoint("public/assignment/**/*.js", "public/assignment/bundle.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/assignment")
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["latest"]
                    }
                }
            }
        ]
    }
};

function getEntryPoint(searchPath, excludeInPath) {
    return glob
        .sync(searchPath)
        .filter(x => x !== excludeInPath)
        .map(x => "./" + x);
}