var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
        //is user logged in?
        if (req.isAuthenticated()) {
            Campgrounds.findById(req.params.id,function (err,foundcampground) {
                if (err){
                    req.flash("error","Campground Not Found")
                    res.redirect("back");
                } else{
                    // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                    if (!foundcampground) {
                        req.flash("error", "Item Not Found.");
                        return res.redirect("back");
                    }
                    //does user own the campground-- id is mongoose object
                    if (foundcampground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","You Don't Have Permission To Do That!");
                        res.redirect("back");
                    }
                }
            });
            //otherwise, redirect
        }else {
            //if not, redirect to previous page
            res.redirect("back")
        }
};

middlewareObj.checkCommentOwnership = function(req,res,next){
        if (req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function (err,foundComment){
                if (err){
                    res.redirect("back");
                } else{
                    // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                    if (!foundComment) {
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }
                    //does author own the comment
                    if (foundComment.author.id.equals(req.user._id)){
                        next();
                    } else{
                        req.flash("error","You Don't Have Permission To Do That!");
                        res.redirect("back");
                    }
                }
            });
        }else{
            req.flash("error","Please Login First!");
            res.redirect("back");
        }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First!");
    res.redirect("/login",);
};

module.exports = middlewareObj;
