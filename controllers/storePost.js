const Post = require('../models/Post.js')
const path = require('path')
module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', '/public/upload', image.name), function (error) {
        Post.create({
        ...req.body,
        image: '/upload/' + image.name
        }, function (err) {
            res.redirect('/')
        })
    })
}