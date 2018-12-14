var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
        //is user logged in?
        if (req.isAuthenticated()) {
            Campgrounds.findById(req.params.id,function (err,foundcampground) {
                if (err){
                    res.redirect("back");
                } else{
                    //does user own the campground-- id is mongoose object
                    if (foundcampground.author.id.equals(req.user._id)){
                        next();
                    }else{
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
                    //does author own the comment
                    if (foundComment.author.id.equals(req.user._id)){
                        next();
                    } else{
                        res.redirect("back");
                    }
                }
            });
        }else{
            res.redirect("back");
        }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObj;
