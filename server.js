const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

// entry point for assignment
require("./assignment/app")(app);

const port = process.env.PORT || 3000;

app.listen(port);