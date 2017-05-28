(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", function () {
            // local user array
            var users = [
                {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
                {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
                {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
            ];

            // the service
            return {
                createUser(user) {
                    users.push(user);
                },
                findUserById (userId) {
                    return users.find((item) => item._id === userId);
                },
                findUserByUsername(username){
                    return users.find((item) => item.name === username);
                },
                findUserByCredentials(username, password){
                    return users.find(
                        (item) => item.name === username && item.password === password
                    );
                },
                updateUser(userId, user){
                    let oldUser = this.findUserById(userId);
                    checkUserExist(oldUser, userId);
                    Object.assign(oldUser, user, {_id: oldUser._id});
                },
                deleteUser(userId){
                    for(let i = 0; i < users.length; i++){
                        if(users[i]._id === userId){
                            users.splice(i, 1);
                            return;
                        }
                    }
                    checkUserExist(null, userId);
                }
            };

            function checkUserExist(user, name = "") {
                if(!user){
                    throw new Error("the user is not find in id/name" + name);
                }
            }
        });
})();