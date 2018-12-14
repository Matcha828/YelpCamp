var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name:"Greek Village",
        image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f3c671aee8b4bb_340.jpg",
        description:"This is Greek Village"
    },
    {
        name:"China Village",
        image:"https://pixabay.com/get/ef3cb00b2af01c22d2524518b7444795ea76e5d004b0144596f7c970a2ecb6_340.jpg",
        description:"This is China Village"
    },
    {
        name:"New York Village",
        image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f3c671aee8b4bb_340.jpg",
        description:"This is New York Village"
    }
    ];
function seedDB(){
    //Remove all campgrounds
    Campground.remove({},function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed,function (err,Campground) {
                if (err){
                    console.log(err);
                } else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text:"This place is awesome, I strongly recommend this one!",
                        author:"Wei Chen"
                    },function (err,comment) {
                        if (err){
                            console.log(err);
                        } else{
                            Campground.comments.push(comment);
                            Campground.save(function (err,campground) {
                                if (err){
                                    console.log(err);
                                } else {
                                    console.log("Create new comment");
                                }
                            });
                        }
                    });
                }
            });
    });

    });
    //add a few comments
}

module.exports = seedDB;