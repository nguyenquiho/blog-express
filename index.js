const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');


const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUserController')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')


const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

mongoose.connect('mongodb://localhost/express_blog', {useNewUrlParser: true});
app = new express()
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(expressSession({
    secret: 'keyboard cat'
}));

global.loggedIn = null;
app.use("*", (req, res, next) => {
    // console.log(req.session)
    loggedIn = req.session.userId;
    next()
});

// console.log(path.join(__dirname, 'public'));
app.listen(3000, () => {
    console.log('listening ok on port 3000')
})
app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/', homeController);
app.get('/posts/new', authMiddleware, newPostController);
// app.use('/posts/store', authMiddleware, validateMiddleWare);
app.get('/post/:id', getPostController);
app.post('/posts/store', authMiddleware, validateMiddleWare, storePostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'))




    