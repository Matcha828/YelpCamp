var mongoose = require("mongoose");
//SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    price:String,
    description:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

// COMPILE INTO MODEL
var Campgrounds = mongoose.model("Campground",campgroundSchema);

module.exports = Campgrounds;