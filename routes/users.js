var express = require('express');
var router = express.Router();
const db = require('../conf/database');
const bcrypt = require('bcrypt');
const { json } = require('express');
const UserError = require('../helpers/error/UserError');

const saltRounds = 2;


// localhost:3000/users/register
router.post("/register", async function (req, res, next) {

  // server side validation
  // check for duplications
  const { uname, email, pwd } = req.body;
  db.execute('SELECT * from user where uname=? OR email=?', [uname, email])
    .then(async function ([results, fields]) {
      // if there is dup
      if (results && results.length == 1) {
        // req.flash('fail', `cannot rigister user.`);
        res.redirect('/registration');
        //  res.send('user cannot be made');
      } else { // no dup, hashing
        bcrypt.hash(pwd, saltRounds)
          .then(function (hash) {
            // console.log('---------' + hash + '----------');
            return db.execute('INSERT INTO user (uname, pwd, email) VALUES (?, ?, ?)', [uname, hash, email], function (req, res) {
            }).then(function ([results, fields]) {
              if (results && results.affectedRows == 1) {
                req.flash('success', `Hi, ${uname}, register success.`);
                res.redirect('/login');
              } else {
                req.flash('fail', `cannot register user`);
                throw new UserError('user could not be made');
              }
            }).catch(function (err) {
              res.redirect('/registration');
              next(err);
            })
          })
          // if failed to hash pwd
          .catch(function (err) {
            res.json('failed register try again');
          })
      }
    }).catch(function (err) {
      next(err);
    })
  // insert into db
  //respond

})

router.post("/login", function (req, res, next) {
  const { uname, pwd } = req.body;

  let loggedUserId;
  let loggedUsername;

  // server side validation
  db.execute('SELECT uid, uname, email, pwd from user WHERE uname=?', [uname])
    .then(function ([results, fields]) {
      // console.log(hash);
      if (results && results.length == 1) {
        // load hash from db.
        loggedUserId = results[0].uid;
        loggedUsername = results[0].uname;

        const dbpwd = results[0].pwd;
        // dehash pwd
        return bcrypt.compare(pwd, dbpwd);
        // compare
        // promise
      } else { //could not find user by id
        throw new UserError('falied login: Invalide user credentials', "/login", 200);
      }
    }).then(function (passwordMatched) {
      if (passwordMatched) {
        req.session.uid = loggedUserId;
        req.session.uname = loggedUsername;
        req.flash('success', `Hi, ${loggedUsername}, you are now logged in`)
        req.session.save(function (saveError) {
          res.redirect('/');
        })
        // res.redirect('/');
      } else {
        throw new UserError('falied login: Invalide user credentials', "/login", 200);
      }
    })
    .catch(function (err) {
      if (err instanceof UserError) {
        req.flash("error", err.getMessage());
        req.session.save(function (saveError) {
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      }

    })
})

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (destroyError) {
    if (destroyError) {
      next(err);
    } else {
      // req.flash('success', `You have been logged out.`); 
      res.json({
        status: 200,
        message: "You have been logged out."
      });
    }
  })

})

module.exports = router;
