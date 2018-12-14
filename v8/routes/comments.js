var express = require("express");
//merge /:id from app.js to this route
var router = express.Router({mergeParams:true});
var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");

//=======================
//COMMENTS ROUTES
//=======================
//Comments New
router.get("/new", isLoggedIn,function (req,res) {
    //find campground by id
    Campgrounds.findById(req.params.id,function (err,foundCampground) {
        if (err){
            console.log(err);
        } else{
            res.render("comments/new",{campgroundsVar:foundCampground});
        }
    });
});

//Comments create
router.post("/", isLoggedIn,function (req,res) {
    //lookup campground useing ID
    Campgrounds.findById(req.params.id,function (err,foundCampground) {
        if (err){
            console.log(err);
            res.redirect("/campgrounds")
        } else{
            //create new comment
            Comment.create(req.body.comment,function (err,comment) {
                if (err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    //redirect to campground show page
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            })
        }
    });

});

//middleWare
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;