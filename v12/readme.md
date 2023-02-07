## YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy.

## This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.

# Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review
* User profiles include more information on the user (full name, email, phone, join date), their campgrounds, and the option to edit their profile or delete their account
* Search campground by name or location
* Sort campgrounds by highest rating, most reviewed, lowest price, or highest price

# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

# Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

# Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the sever starts

# Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheet

# Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

# Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth Pt. 3 - Login
* Add login routes
* Add login template

# Auth Pt. 4 - Logout/Navbar
* Add logout routes
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

# Refactor The Routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campground Edit Route: <!--/campgrounds/:id/edit-->
Comment Edit Route:   <!--/campgrounds/:id/comments/:comment_id/edit-->

# Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route:    /campgrounds/:id/comments/:comment_id

# Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash!
* Demo working version
* Install and congigure connect-flash
* Add bootstrap alerts to header

# Adding dynamic price  -- v12

# UI Improvements (login and signup, nav-bar, registration flash message)

* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Landing Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPDATE/DELETE CAMPGROUND


=====================================================================
RESTFUL ROUTES
NAME    url             verb    description
-------------------------------------------------------------------------------
INDEX   /dogs           GET     Display a list of all dogs

NEW     /dogs/new       GET     Display form to make a new dog
CREATE  /dogs           POST    Add new dog to DB

SHOW    /dogs/:id       GET     Shows info about one dog

Edit    /dogs/:id/edit  GET     Show edit form for one dog
Update  /dogs/:id       PUT     Update a particular dog, then redirect somewhere

Destroy /dogs/:id       DELETE  Delete a particular dog,then redirect somewhere
---------------------------------------------------------------------------------
NEW     /dogs/:id/comments/new      GET
CREATE  /dogs/:id/comments          POST
=================================================================================

Create: New & Create

Read: Index & Show

Update: Edit & Update

Destroy: Delete
/////////////////////////////////////////////////////////////
#// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
#passport.use(User.createStrategy());
* The reason for this functionality is that when using the usernameField option 
* to specify an alternative usernameField name, for example "email" passport-local
* would still expect your frontend login form to contain an input field with name 
* "username" instead of email. This can be configured for passport-local but this
* is double the work. So we got this shortcut implemented.
////////////////////////////////////////////////////////////////////
