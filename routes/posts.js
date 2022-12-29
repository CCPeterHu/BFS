const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/protector');
const multer = require('multer');
const sharp = require('sharp');

const db = require('../conf/database');
const { getRecentPost } = require('../middleware/posts');
// const UserError = require('../helpers/error/UserError');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // image/jpeg  [1] = jpeg
    let fileExt = file.mimetype.split('/')[1];
    //   console.log(fileExt);
    cb(null, `${file.fieldname} - ${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`)
  }
})

const upload = multer({ storage: storage })

router.post("/create", isLoggedIn, upload.single("uploadImage"), function (req, res, next) {
  // console.log(req.session);
  let uploadedFile = req.file.path;
  // console.log('uploaded------->' + req.file);
  let thumbnailName = `thumbnail-${req.file.filename}`;
  let destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`
  const { title, description } = req.body;
  const userId = req.session.uid;
  // console.log('--------user id--->' + userId );

  sharp(uploadedFile)
    .resize({
      fit: sharp.fit.contain,
      width: 200,
      height: 200
    })
    .sharpen()
    .toFile(destinationOfThumbnail)
    .then(function () {
      let baseSQL = `
            INSERT INTO posts(title, description, image, 
                thumbnail, fk_user_id) VALUES (?,?,?,?,?)
            `
      return db.execute(baseSQL, [title, description, uploadedFile
        , destinationOfThumbnail, userId]);
    })
    .then(function ([results, fields]) {
      // console.log(results);
      // console.log(fields);
      if (results && results.affectedRows) {
        req.flash("success", "Post complete!");
        req.session.save(function (saveError) {
          res.redirect('/');
        })
      }
    })
    .catch(err => next(err));
  // res.send();
})

//localhost:3000/posts/search
router.get("/search", getRecentPost, function (req, res, next) {
  let searchTerm = `%${req.query.searchTerm}%`;
  let originalSearchTerm = req.query.searchTerm;

  let baseSQL = `select post_id, title, description, thumbnail, concat_ws(" ", title, description) as haystack FROM posts
  HAVING haystack LIKE ?;`
  db.execute(baseSQL, [searchTerm])
    .then(function ([results, fields]) {
      if (results && results.length >= 1) {
        res.locals.results = results;
        res.locals.searchValue = originalSearchTerm;
        // console.log(results);
        req.flash('success', `${results.length} results found`);
        res.render('index', { css: ["index.css"], js: ["index.js"] });
      } else {
        req.flash('success', `${results.length} results found`);
        // console.log(req.searchTerm);
        res.render('index', { css: ["index.css"], js: ["index.js"] });

      }
    })
    .catch((err) => next(err));

})


/**
 * @depricated my own old solusion
 */
// router.post("/comment/", function (req, res, next) {
//   const comment = req.body.comment;
//   const uname = req.body.uname;
//   const postid = req.body.postid;
//   // console.log(postid);
//   // console.log(comment);

//   db.execute(`SELECT uid FROM user where uname=?`, [uname])
//     .then(function ([results, fields]) {
//       // console.log(results[0].uid);
//       let uid = results[0].uid;
//       // res.locals.uid = uid;
//       // console.log('----->' + res.locals.uid);
//       db.execute(`INSERT INTO comments (fk_post_id, fk_user_id, text) 
//     VALUES (?, ?, ?);` , [postid, uid, comment])
//         .then(function ([results, fields]) {
//           if(results && results.affectedRows == 1){
//             //insert success
//             req.flash('success', `comment added`);
//           }
//         })
//     })
//   res.redirect(`/posts/${postid}`);
// })

module.exports = router;