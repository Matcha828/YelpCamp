var express     = require("express"),
     app        = express(),
     bodyParser = require("body-parser"),
     mongoose   = require("mongoose"),
     Campgrounds = require("./models/campground"),
     seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp_v3",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
seedDB();

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
    Campgrounds.findById(req.params.id).populate("comments").exec(function (err,foundCampground) {
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