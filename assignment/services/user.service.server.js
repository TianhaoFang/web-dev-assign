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

    function createUser(req, res) {
        let user = req.body;
        user._id = genId();
        users.push(user);
        res.json(user);
    }

    function findUser(req, res) {
        const username = req.query.username;
        const password = req.query.password;
        if (username) {
            if (password) {
                sendNullableJson(res, findUserByCredentials(username, password));
            } else {
                sendNullableJson(res, findUserByUsername(username));
            }
        } else {
            res.status(400).json({error: "should have query parameter username and/or password"});
        }
    }

    function findUserByUsername(username) {
        return users.find(item => item.username === username);
    }

    function findUserByCredentials(username, password) {
        return users.find(item => item.username === username && item.password === password);
    }

    function findUserById(req, res) {
        let userId = req.params.userId;
        sendNullableJson(res,
            users.find(item => item._id === userId)
        );
    }

    function updateUser(req, res) {
        const userId = req.params.userId;
        const user = req.body;
        const oldUser = users.find(item => item._id === userId);
        if(!oldUser) return sendNullableJson(res, null);
        Object.assign(oldUser, user, {_id: oldUser._id});
        res.json(oldUser);
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

    function genId() {
        return String(newId++);
    }

    function sendNullableJson(res, result) {
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({error: "not find such user"});
        }
    }
};