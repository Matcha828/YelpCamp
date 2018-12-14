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
           res.render("campgrounds/index",{campgroundsVar: allCampgrounds, currentUserVar:req.user})
       }
    });
});

//NEW - show form to add new campgrounds
app.get("/campgrounds/new",function (req,res) {
    res.render("campgrounds/new");
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
            res.render("campgrounds/show",{campgroundsVar: foundCampground});
        }
    });
});

//=======================
//COMMENTS ROUTES
//=======================
app.get("/campgrounds/:id/comments/new", isLoggedIn,function (req,res) {
    //find campground by id
    Campgrounds.findById(req.params.id,function (err,foundCampground) {
        if (err){
            console.log(err);
        } else{
            res.render("comments/new",{campgroundsVar:foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn,function (req,res) {
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
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            })
        }
    });
  
    //connect new comment to campground
    //redirect to campground show page
});

//==========================================================
//AUTH ROUTES
//===========================================================

// show register form
app.get("/register",function (req,res) {
   res.render("register");
});

//handle sign up logic
app.post("/register",function (req,res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function (err,user) {
       if (err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function () {
          res.redirect("/campgrounds");
       });
    });
});

//show login form
app.get("/login",function (req,res) {
   res.render("login");
});

//handle login logic - app.post("/login",middleware,callback)
app.post("/login", passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    })
    ,function (req,res) {
});

//logout routes
app.get("/logout",function (req,res) {
   req.logout();
   res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000,function () {
    console.log("The YelpCamp Server Has Started!!!");
});