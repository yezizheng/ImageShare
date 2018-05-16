var express = require("express");
var router  = express.Router();
var Post = require("../models/post");
var middleware = require("../middleware");
var request = require("request");

//INDEX - show all posts
router.get("/", function(req, res){
    // Get all posts from DB
    Post.find({}, function(err, allPosts){
       if(err){
           console.log(err);
       } else {
           res.render("posts/index",{posts:allPosts});
       }
    });
});

//CREATE - add new post to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to posts array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var time = new Date().toLocaleString();
    var newPost = {name: name, image: image, description: desc, author:author, time: time}
    // Create a new post and save to DB
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to posts page
            console.log(newlyCreated);
            res.redirect("/posts");
        }
    });
});

//NEW - show form to create new post
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("posts/new"); 
});

// SHOW - shows more info about one post
router.get("/:id", function(req, res){
    //find the post with provided ID
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            console.log(foundPost)
            //render show template with that post
            res.render("posts/show", {post: foundPost});
        }
    });
});

router.get("/:id/edit", middleware.checkUserpost, function(req, res){
    console.log("IN EDIT!");
    //find the post with provided ID
    Post.findById(req.params.id, function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            //render show template with that post
            res.render("posts/edit", {post: foundPost});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, image: req.body.image, description: req.body.desc};
    Post.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, post){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/posts/" + post._id);
        }
    });
});


//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

module.exports = router;

