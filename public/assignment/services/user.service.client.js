(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http, UtilService) {
        let parseData = UtilService.parseData;

        // the service
        return {
            register: function(user) {
                return $http.post("/api/register", user).then(parseData);
            },
            findUserById: function(userId) {
                return $http.get("/api/user/" + userId).then(parseData);
            },
            findUserByUsername: function(username){
                return $http.get("/api/user", {params: {
                    username: username
                }}).then(parseData);
            },
            updateUser: function(userId, user){
                return $http.put("/api/user/" + userId, user).then(parseData);
            },
            deleteUser: function(userId){
                return $http.delete("/api/user/" + userId).then(parseData);
            },
            getLoggedIn: function () {
                return $http.get("/api/loggedin").then(parseData);
            },
            login: function (username, password) {
                return $http.post("/api/login", {username, password}).then(parseData);
            },
            logout: function () {
                return $http.post("/api/logout").then(parseData);
            }
        };
    }
})();