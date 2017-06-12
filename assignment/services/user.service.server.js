const User = require("./../model/user.model.server");

module.exports = function (app) {
    let newId = 501;
    const users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/app/user/:userId", deleteUser);

    async function createUser(req, res) {
        let user = req.body;
        let newUser = await User.createUser(user);
        res.json(newUser);
    }

    async function findUser(req, res) {
        const username = req.query.username;
        const password = req.query.password;
        if (username) {
            if (password) {
                sendNullableJson(res, await User.findUserByCredentials(username, password));
            } else {
                sendNullableJson(res, await User.findUserByUsername(username));
            }
        } else {
            res.status(400).json({error: "should have query parameter username and/or password"});
        }
    }

    async function findUserById(req, res) {
        let userId = req.params.userId;
        sendNullableJson(res, await User.findUserById(userId));
    }

    async function updateUser(req, res) {
        const userId = req.params.userId;
        const user = req.body;
        sendNullableJson(res, await User.updateUser(userId, user));
    }

    function deleteUser(req, res){
        const userId = req.params.userId;
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id === userId) {
                sendNullableJson(res, users.splice(i, 1)[0]);
                return;
            }
        }
        sendNullableJson(res, null);
    }

    function sendNullableJson(res, result) {
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({error: "not find such user"});
        }
    }
};