var express     = require("express"),
     app        = express(),
     bodyParser = require("body-parser"),
     mongoose   = require("mongoose"),
     passport   = require("passport"),
     LocalStrategy = require("passport-local"),
     passportLocalMongoose = require("passport-local-mongoose"),
     session = require("express-session"),
     Campgrounds = require("./models/campground"),
     Comment    = require("./models/comment"),
     User       = require("./models/user"),
     seedDB = require("./seeds");

//requiring routes
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// PASSPORT CONFIGURATION
app.use(session({
    secret:"Webber and Isabela together!!!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set login navbar status to every route
app.use(function (req,res,next) {
   res.locals.currentUserVar = req.user;
   next();
});

mongoose.connect("mongodb://localhost/yelp_camp_v6",{useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
// seedDB();//seed the database

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000,function () {
    console.log("The YelpCamp Server Has Started!!!");
});