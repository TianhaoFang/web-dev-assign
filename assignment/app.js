module.exports = function (app) {
    require("./webpack.execute")(app);

    require("./services/user.service.server")(app);
};