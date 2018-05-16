var express = require("express");
var router  = express.Router({mergeParams: true});
var Post = require("../models/post");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find post by id
    console.log(req.params.id);
    Post.findById(req.params.id, function(err, post){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {post: post});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup post using ID
   Post.findById(req.params.id, function(err, post){
       if(err){
           console.log(err);
           res.redirect("/posts");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //add comment time
               comment.time = new Date().toLocaleString();
               //save comment
               comment.save();
               post.comments.push(comment);
               post.save();
               console.log(comment);
               req.flash('success', 'Created a comment!');
               res.redirect('/posts/' + post._id);
           }
        });
       }
   });
});

router.get("/:commentId/edit", middleware.isLoggedIn, function(req, res){
    // find post by id
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {post_id: req.params.id, comment: comment});
        }
    })
});

router.put("/:commentId", function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/posts/" + req.params.id);
       }
   }); 
});

router.delete("/:commentId",middleware.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    })
});

module.exports = router;