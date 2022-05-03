const mongoose = require('mongoose')
const Post = require('./models/Post')
mongoose.connect('mongodb://localhost/express_blog', { useNewUrlParser: true });

//Create

Post.create({
 title: 'Sách ok nè',
 body: 'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn.'
}, (error, post) => {
 console.log(error, post)
})

// Select

Post.find({
    'title' : 'Sách ok nè'
}, (error, post) => {
    console.log(error, post)
});

// Update
var id = "626ff95ef94224428d30d91b";
Post.findByIdAndUpdate(id, {
 title: 'Updated title'
}, (error, post) => {
 console.log(error, post)
})

// Delete
var id = "5cb436980b33147489eadfbb";
BlogPost.findByIdAndDelete(id, (error, blogspot) => {
 console.log(error, blogspot)
})
