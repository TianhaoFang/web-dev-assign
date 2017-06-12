module.exports = function (app) {
    require("./webpack.execute")(app);

    // the definition of model and connection
    require("./model/models.server");

    // the define of user service
    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
    require("./services/widget.service.server")(app);
    require("./services/page.service.server")(app);
};