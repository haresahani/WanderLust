const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");


router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.singup));

router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {  // checks the username/password against MongoDB.
        failureRedirect: "/login",
        failureFlash: true // makes sure invalid credentials send the user back to /login with a flash error.
    }),
    userController.login
);

router.get("/logout", userController.logout);

module.exports = router;