var express     = require("express"),
     app        = express(),
     bodyParser = require("body-parser"),
     mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});

// COMPILE INTO MODEL
var Campgrounds = mongoose.model("Campground",campgroundSchema);

// Campgrounds.create(
//     {name:"Salmon Greek",image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",description:"This is a huge Mountain with plenty of salmons, no hotels. No water for sale, but it is still a beautiful spot!"},
//     // {name:"Granite Hill", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     // {name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/1252399/pexels-photo-1252399.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     // {name:"Lanier Lake's Load", image:"https://images.pexels.com/photos/1555453/pexels-photo-1555453.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     // {name:"Cartiel Kingo",image:"https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     // {name:"Danger Island",image:"https://images.pexels.com/photos/735837/pexels-photo-735837.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     // {name:"Butterflier",image:"https://images.pexels.com/photos/967098/pexels-photo-967098.jpeg?auto=compress&cs=tinysrgb&h=350"},
//     function (err,campground) {
//         if (err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(campground);
//         }
//     });

app.get("/",function (req,res) {
    res.render("landing");
});

//INDEX - Show all campgrounds
app.get("/campgrounds",function (req,res) {
    //Get all campgrounds from DB
    Campgrounds.find({},function (err,allCampgrounds) {
       if(err){
           console.log(err);
       }else {
           res.render("index",{campgroundsVar: allCampgrounds})
       }
    });
});

//NEW - show form to add new campgrounds
app.get("/campgrounds/new",function (req,res) {
    res.render("new");
});

//CREATE - Add new campgrounds to database
app.post("/campgrounds",function (req,res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description:description};

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
app.get("/campgrounds/:id",function (req,res) {
    //find the campground with provided ID
    Campgrounds.findById(req.params.id,function (err,foundCampground) {
        if (err){
            console.log(err);
        }else {
            //render show template with that campground
            res.render("show",{campgroundsVar: foundCampground});
        }
    });
});

app.listen(3000,function () {
    console.log("The YelpCamp Server Has Started!!!");
});