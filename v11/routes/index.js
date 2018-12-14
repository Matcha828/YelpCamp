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
            // you can either set a flash message on the req.flash
            // object before returning a res.redirect() or you can
            // pass the req.flash object into the res.render() function.
            console.log(err);
            return res.render("register",{error:err.message});
        }
        passport.authenticate("local")(req,res,function () {
            req.flash("success","Welcome To YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login",function (req,res) {
    res.render("login");
});

//handle login logic - app.post("/login",middleware,callback)
router.post("/login", function (req,res,next){
    passport.authenticate("local",
        {
            successRedirect:"/campgrounds",
            failureRedirect:"/login",
            //successFlash will be sent under success by default.
            successFlash:"Welcome to YelpCamp," + req.body.username + "!",
            failureFlash:true
        })(req,res,next)
});

//logout routes
router.get("/logout",function (req,res) {
    req.logout();
    req.flash("success","You Have Successfully Logged Out Of Your Account!");
    res.redirect("/campgrounds");
});

module.exports = router;