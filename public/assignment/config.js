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
                .when("/login", loginPage)
                .when("default", loginPage)

                .when("/register", {
                    templateUrl: "views/user/templates/register.view.client.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/user/:uid", {
                    templateUrl: "views/user/templates/profile.view.client.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })

                .when("/user/:uid/website", {
                    templateUrl: "views/website/templates/website-list.view.client.html",
                    controller: "WebsiteListController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/new", {
                    templateUrl: "views/website/templates/website-new.view.client.html",
                    controller: "WebsiteNewController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid", {
                    templateUrl: "views/website/templates/website-edit.view.client.html",
                    controller: "WebsiteEditController",
                    controllerAs: "model"
                })

                .when("/user/:uid/website/:wid/page", {
                    templateUrl: "views/page/templates/page-list.view.client.html",
                    controller: "PageListController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/new", {
                    templateUrl: "views/page/templates/page-new.view.client.html",
                    controller: "PageNewController",
                    controllerAs: "model"
                })
                .when("/user/:uid/website/:wid/page/:pid", {
                    templateUrl: "views/page/templates/page-edit.view.client.html",
                    controller: "PageEditController",
                    controllerAs: "model"
                })
        })
})();