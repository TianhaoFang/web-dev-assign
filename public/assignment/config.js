(function () {
    var loginPage = {
        templateUrl: "views/user/templates/login.view.client.html",
        controller: "LoginController",
        controllerAs: "model"
    };

    angular
        .module("WebAppMaker")
        .config(function ($routeProvider) {
            $routeProvider
                .when("/", loginPage)
        })
})();