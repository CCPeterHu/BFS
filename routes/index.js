var express = require('express');
const {isLoggedIn} = require('../middleware/protector');
var router = express.Router();
const {getRecentPost, getPostById, getCommentsForPostById} = require('../middleware/posts');
const db = require('../conf/database')


/* GET home page. */
router.get('/', getRecentPost, function(req, res, next) {
  res.render('index', {css: ["index.css"], js: ["index.js"]});
});

router.get('/index', function(req, res, next) {
  res.render('index', {css: ["index.css"], js: ["index.js"]});
});

router.get('/login', function(req, res, next) {
  res.render('login', {css: ["login.css"], js: ["index.js"]});
});

router.get('/registration', function(req, res, next) {
  res.render('registration', {css: ["registration.css"], js: ["registration.js", "index.js"]});
});

router.get('/postimage', isLoggedIn, function(req, res, next) {
  // console.log(req.session.isLoggedIn);
  res.render('postimage', {css: ["postimage.css"], js: ["index.js"]});
});

router.get('/viewpost', function(req, res, next) {
  res.render('viewpost', {css: ["viewpost.css"], js: ["viewpost.js"]});
});

router.get('/order', function(req, res, next) {
  res.render('order', {css: ["index.css", "order.css"], js: ["index.js"]});
});

router.get('/posts/:id(\\d+)',getPostById, getCommentsForPostById, function(req, res, next) {
  res.locals.postID = req.params.id;
  res.render('viewpost', {css: ["viewpost.css", "index.css"]});
});


module.exports = router;
