var express = require("express");
//merge /:id from app.js to this route
var router = express.Router({mergeParams:true});
var Campgrounds = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=======================
//COMMENTS ROUTES
//=======================
//Comments New
router.get("/new", middleware.isLoggedIn,function (req,res) {
    //find campground by id
    Campgrounds.findById(req.params.id,function (err,foundCampground) {
        if (err){
            console.log(err);
        } else{
            res.render("comments/new",{campgroundsVar:foundCampground});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn,function (req,res) {
    //lookup campground useing ID
    Campgrounds.findById(req.params.id,function (err,foundCampground) {
        if (err){
            console.log(err);
            res.redirect("/campgrounds")
        } else{
            //create new comment
            Comment.create(req.body.comment,function (err,comment) {
                if (err){
                    req.flash("error","Something Went Wrong!");
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
                    req.flash("success","Successfully Added Comment!");
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            })
        }
    });

});

//Comments Edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function (req,res) {
        Comment.findById(req.params.comment_id,function (err,foundComment) {
            if (err){
                res.redirect("back");
            }else{
                res.render("comments/edit",{campgroundsVar_id:req.params.id, commentVar:foundComment});
            }
        });
});

//Comments Update
router.put("/:comment_id",middleware.checkCommentOwnership,function (req,res) {
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function (err,updatedComment) {
       if (err){
           res.redirect("back");
       } else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) ;
});

//Comments Delete
router.delete("/:comment_id",middleware.checkCommentOwnership,function (req,res) {
   // findByIdAndDelete
   Comment.findByIdAndDelete(req.params.comment_id,function (err) {
       if (err){
           res.redirect("back");
       } else{
           req.flash("success","Comment Deleted!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   })
});

module.exports = router;