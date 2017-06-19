const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./../model/user.model.server");
const {customAuth} = require("./middleware");

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use(new LocalStrategy(localStrategy));

const facebookConfig = {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

const authSameUser = customAuth((user, req) => user._id.toString() === req.params.userId);

module.exports = function (app) {
    app.post("/api/user", createUser);
    app.post("/api/register", createUser);
    app.get("/api/user/:userId", authSameUser, findUserById);
    app.put("/api/user/:userId", authSameUser, updateUser);
    app.delete("/api/user/:userId", authSameUser, deleteUser);
    app.post("/api/login", passport.authenticate("local"), successLogin);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.get("/api/auth/FB", passport.authenticate("facebook"));
    app.get("/api/auth/FB/callback", passport.authenticate("facebook"));

    async function createUser(req, res) {
        let user = req.body;
        if (!user.username) return res.status(400).json({
            message: "username is required"
        });
        let existUser = await User.findUserByUsername(user.username);
        if (existUser) return res.status(400).json({
            message: "the username is already used"
        });
        user = await User.createUser(user);
        await new Promise((resolve, reject) => {
            req.login(user, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        res.json(user);
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

    async function deleteUser(req, res) {
        const userId = req.params.userId;
        console.log("delete user");
        sendNullableJson(res, await User.deleteUser(userId));
    }

    function successLogin(req, res) {
        sendNullableJson(res, req.user);
    }

    function logout(req, res) {
        req.logOut();
        res.json({"message": "ok"});
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.user : false);
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
    try {
        const queryUser = await User.findUserById(user._id);
        if (!queryUser) return done(null, false);
        return done(null, queryUser);
    } catch (err) {
        done(err, null);
    }
}

async function localStrategy(username, password, done) {
    try {
        const user = await User.findUserByCredentials(username, password);
        if (user && user.username === username && user.password === password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        if (!err) err = new Error();
        return done(err, null);
    }
}

function facebookStrategy(token, refreshToken, profile, done) {
    console.log(JSON.stringify(profile));
    console.log("profile", profile);
    console.log("profile.id", profile.id);
    console.log("profile.name", profile.name);
    console.log("profile.emails", profile.emails);
    return done(null, false);
}
