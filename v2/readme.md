#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

RESTFUL ROUTES
NAME    url             verb    description
============================================================
INDEX   /dogs           GET     Display a list of all dogs

NEW     /dogs/new       GET     Display form to make a new dog
CREATE  /dogs           POST    Add new dog to DB

SHOW    /dogs/:id       GET     Shows info about one dog

Edit    /dogs/:id/edit  GET     Show edit form for one dog
Update  /dogs/:id       PUT     Update a particular dog, then redirect somewhere

Destroy /dogs/:id       DELETE  Delete a particular dog,then redirect somewhere
=================================================================================

Create: New & Create

Read: Index & Show

Update: Edit & Update

Destroy: Delete