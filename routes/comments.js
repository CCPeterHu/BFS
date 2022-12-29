const express = require("express");
const router = express.Router();
const db = require('../conf/database');
// const app = require('../app');
// const http = require('http');
// const server = http.createServer(app);


//  create a comment
router.post('/create', function(req, res, next){
    if(!req.session.uid){
        req.flash('You must be logged in');
        res.json({
            status: 'error',
            message: 'you must be loged in'
        });
    }else{
        let {commentText, postId} = req.body;
        let userId = req.session.uid;
        let uname = req.session.uname;
        // console.log('------------->', req.session);
        db.query(`INSERT INTO comments (fk_post_id, fk_user_id, text) 
        VALUES (?, ?, ?);` ,[postId, userId, commentText])
            .then(function([results, fields]){
                if(results && results.affectedRows === 1){
                    // console.log('-------->', results);
                    // req.flash('success', 'Your comment was created');
                    res.json({
                        status: 'success',
                        message: "Your comment was created",
                        data: {
                            comment: commentText,
                            uid: userId,
                            uname: uname,
                            comment_id: results.insertId,
                            createAt: new Date().toLocaleString('en-US',{
                                timeStyle: "long",
                                dateStyle: "long"
                            })
                        }
                    })
                }else{
                    res.json({
                        status: 'error',
                        message: "Comment could not be created"
                    })
                }
            })
    }
})

module.exports = router;