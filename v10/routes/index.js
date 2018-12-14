var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//root route
router.get("/",function (req,res) {
    res.render("landing");
});

//==========================================================
//AUTH ROUTES
//===========================================================

// show register form
router.get("/register",function (req,res) {
    res.render("register");
});

//handle sign up logic
router.post("/register",function (req,res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function (err,user) {
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function () {
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login",function (req,res) {
    res.render("login");
});

//handle login logic - app.post("/login",middleware,callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    })
    ,function (req,res) {
    });

//logout routes
router.get("/logout",function (req,res) {
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;