var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds = [
    {name:"Salmon Greek",image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Granite Hill", image:"https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Mountain Goat's Rest", image:"https://images.pexels.com/photos/1252399/pexels-photo-1252399.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Lanier Lake's Load", image:"https://images.pexels.com/photos/1555453/pexels-photo-1555453.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Cartiel Kingo",image:"https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Danger Island",image:"https://images.pexels.com/photos/735837/pexels-photo-735837.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name:"Butterflier",image:"https://images.pexels.com/photos/967098/pexels-photo-967098.jpeg?auto=compress&cs=tinysrgb&h=350"}
];

app.get("/",function (req,res) {
    res.render("landing");
});

app.get("/campgrounds",function (req,res) {
    res.render("campgrounds", {campgroundsVar:campgrounds});
});

//Page shows the form
app.get("/campgrounds/new",function (req,res) {
    res.render("new");
});

app.post("/campgrounds",function (req,res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};

    campgrounds.push(newCampground);
    //redirect back to campground page
    res.redirect("/campgrounds");
});

app.listen(3000,function () {
    console.log("The YelpCamp Server Has Started!!!");
});