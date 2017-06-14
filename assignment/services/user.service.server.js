const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./../model/user.model.server");

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy));

module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    async function createUser(req, res) {
        let user = req.body;
        if(!user.username) return res.status(400).json({
            message: "username is required"
        });
        let existUser = await User.findUserByUsername(user.username);
        if(existUser) return res.status(400).json({
            message: "the username is already used"
        });
        res.json(await User.createUser(user));
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

    async function deleteUser(req, res){
        const userId = req.params.userId;
        console.log("delete user");
        sendNullableJson(res, await User.deleteUser(userId));
    }

    function sendNullableJson(res, result) {
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({message: "not find such user"});
        }
    }
};

function serializeUser(user, done) {
    done(null, user);
}

async function deserializeUser(user, done) {
    try{
        const queryUser = await User.findUserById(user._id);
        if(!queryUser) return done(null, false);
        return done(null, queryUser);
    }catch (err){
        done(err, null);
    }
}

async function localStrategy(username, password, done) {
    try{
        const user = await User.findUserByCredentials(username, password);
        if(user && user.username === username && user.password === password){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }catch (err){
        if(!err) err = new Error();
        return done(err, null);
    }
}
