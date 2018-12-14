var express = require("express");
var router = express.Router();
var Campgrounds = require("../models/campground");
var middleware = require("../middleware");//automatically use index.js as main file

//INDEX - Show all campgrounds
router.get("/",function (req,res) {
    //Get all campgrounds from DB
    Campgrounds.find({},function (err,allCampgrounds) {
        if(err){
            console.log(err);
        }else {
            res.render("campgrounds/index",{campgroundsVar: allCampgrounds, currentUserVar:req.user})
        }
    });
});

//NEW - show form to add new campgrounds
router.get("/new",middleware.isLoggedIn,function (req,res) {
    res.render("campgrounds/new");
});

//CREATE - Add new campgrounds to database
router.post("/",middleware.isLoggedIn,function (req,res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };

    var newCampground = {name:name, image:image,author:author,description:description};

    if (newCampground.name.length != 0 && newCampground.image.length != 0 && newCampground.description.length != 0) {
        Campgrounds.create(newCampground, function (err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                //redirect back to campground page
                res.redirect("/campgrounds");
            }
        });
    }else {
        res.redirect("/campgrounds/new");
    }
});

//The order of custom id should be placed at the end of the routes,
// so that it wont mix with previous routes.
//SHOW - Show mroe info about one campground
router.get("/:id",function (req,res) {
    //find the campground with provided ID
    Campgrounds.findById(req.params.id).populate("comments").exec(function (err,foundCampground) {
        if (err){
            console.log(err);
        }else {
            //render show template with that campground
            res.render("campgrounds/show",{campgroundsVar: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function (req,res) {
    Campgrounds.findById(req.params.id,function (err,foundcampground) {
        res.render("campgrounds/edit",{campgroundsVar:foundcampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership,function (req,res) {
   // find and update the correct campground
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground,function (err,updatedCampground) {
     if (err){
         res.redirect("/campgrounds")
     }else{
         res.redirect("/campgrounds/" + req.params.id);
     }
   });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function (req,res) {
   Campgrounds.findByIdAndDelete(req.params.id,function (err) {
       if (err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;