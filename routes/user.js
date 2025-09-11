const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async(req, res) => {
    try {
        let {username, email, password} = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to WanderLust! Your account has been created successfully.");
    res.redirect("/listings");
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post("/login", 
    passport.authenticate("local", {  // checks the username/password against MongoDB.
        failureRedirect: "/login", 
        failureFlash: true // makes sure invalid credentials send the user back to /login with a flash error.
    }), 
    (req, res) => {
        req.flash("success", `Welcome back, ${req.user.username}!`);
        res.redirect("/listings");
    }
);
module.exports = router;