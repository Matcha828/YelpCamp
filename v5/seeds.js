var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name:"Greek Village",
        image:"https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f3c971a3ecb3bd_340.jpg",
        description:"This is Greek Village.Spicy jalapeno bacon ipsum dolor amet pork loin sirloin picanha tri-tip jerky shoulder leberkas jowl frankfurter cow tongue tenderloin cupim. Turducken buffalo frankfurter boudin short ribs chuck. Pastrami pork chop pork belly ribeye, boudin biltong bacon cupim beef. Buffalo pork belly brisket landjaeger strip steak. Meatball landjaeger ham, chicken pig buffalo doner filet mignon flank kielbasa salami swine."
    },
    {
        name:"China Village",
        image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f3c971a3ecb3bd_340.jpg",
        description:"This is China VillageSpicy jalapeno bacon ipsum dolor amet pork loin sirloin picanha tri-tip jerky shoulder leberkas jowl frankfurter cow tongue tenderloin cupim. Turducken buffalo frankfurter boudin short ribs chuck. Pastrami pork chop pork belly ribeye, boudin biltong bacon cupim beef. Buffalo pork belly brisket landjaeger strip steak. Meatball landjaeger ham, chicken pig buffalo doner filet mignon flank kielbasa salami swine."
    },
    {
        name:"New York Village",
        image:"https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144596f8c97da6ebb0_340.jpg",
        description:"This is New York VillageSpicy jalapeno bacon ipsum dolor amet pork loin sirloin picanha tri-tip jerky shoulder leberkas jowl frankfurter cow tongue tenderloin cupim. Turducken buffalo frankfurter boudin short ribs chuck. Pastrami pork chop pork belly ribeye, boudin biltong bacon cupim beef. Buffalo pork belly brisket landjaeger strip steak. Meatball landjaeger ham, chicken pig buffalo doner filet mignon flank kielbasa salami swine."
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