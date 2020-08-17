const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')

//get models
const Post = require('../modals/postSchema')

//get
router.get('/allpost', requireLogin, (req, res) => {
    Post.find({})
    .populate('postedBy', "_id name")
    .populate("comments.postedBy", "_id name")
      .then(data => res.json({data}))
      .catch(err => console.log(err, ' errr'))
  })
  
//create  
router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body
    // console.log(req.body, ' bodyyyyyyy')
    if(!title || !body || !pic ){
        return res.status(422).json({
            error: 'Please add all the fields'
        })
    }
    
    // console.log(req.user, ' userrrr')
    // res.send('okkkkkkk')

    req.user.password = undefined

    const newPost = new Post({ title, body, pic, postedBy: req.user })

    newPost.save()
        .then(data => res.json({post:data, message: 'created post succesfully'}))
        .catch(err => console.log(err, ' errrr'))
})

//useronly
router.get('/mypost', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
    .populate('postedBy', "_id name")
    .then(myPost => {
        res.json({ myPost })
    })
    .catch(err => console.log(err, ' errr'))
})

//like
router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new: true
    })
    .populate('postedBy', "_id, name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({ error: err})
        }else{
            res.json(result)
        }
    })
})

//unlike
router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new: true
    })
    .populate('postedBy', "_id, name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({ error: err})
        }else{
            res.json(result)
        }
    })
})

//coment
router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.comment,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({ error: err})
        }else{
            res.json(result)
        }
    })
})

//dlete
router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id: req.params.postId})
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if(err || !post){
                res.status(402).json({ error: err })
            }
            // if(post.postedBy._id.toString() === req.user._id.toString()){
            else {   
                post.remove()
                .then(data => {
                    res.json({
                        data,
                        message: 'Post deleted succesfully'
                    })
                }).catch(err => console.log(err, ' errr'))
            }
        })
})

module.exports = router
