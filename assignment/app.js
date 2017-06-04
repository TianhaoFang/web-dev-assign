module.exports = function (app) {
    require("./webpack.execute")(app);

    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
};