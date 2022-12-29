const db = require('../conf/database')

module.exports = { 
    getRecentPost: function(req, res, next) {
        db.query('SELECT post_id, title, description, thumbnail from posts LIMIT 10;')
            .then(function ([results, fields]) {
                if (results && results.length) {
                    res.locals.results = results;
                }
                next();
            })
            .catch(err => next(err));
        },

    getPostById: function(req, res, next) {
        const post_id = req.params.id
        db.query(`SELECT p.title, p.description, 
        p.image, p.createdAT, u.uname FROM mydb.posts p JOIN user u ON p.fk_user_id=u.uid WHERE post_id=?;`, [post_id])
            .then(function([results, fields]){
                if(results && results.length == 1) {
                    res.locals.currentPost = results[0];
                }else{
                    return new Error('post id dost not exit');
                }
                next();
            })
            .catch(err=> next(err));
    },

    getCommentsForPostById: function(req, res, next){
        const post_id = req.params.id;
        let baseSQL = `SELECT c.id, c.text, c.createAt, u.uname 
        FROM comments c JOIN user u ON c.fk_user_id=u.uid
        WHERE fk_post_id=?;`
        db.execute(baseSQL, [post_id])
            .then(function([results, fields]){
                // console.log('time----------->' + results[0].createAt);
                results.forEach(function(item){
                    item.createAt = new Date(item.createAt).toLocaleString("en-US", {
                        timeStyle: "long",
                        dateStyle: "long"
                    });
                })
                res.locals.currentPost.comments = results;
                next();
            })
            .catch(err => next(err));

    }
};