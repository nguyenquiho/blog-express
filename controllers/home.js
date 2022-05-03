const Post = require('../models/Post.js')
module.exports = (req, res) => {
    Post.find({}, function (error, posts) {
    console.log(req.session)
    res.render('index', {
    posts: posts
    });
 })
}
