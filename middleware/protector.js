module.exports = {
    isLoggedIn : function(req, res, next){
        if(req.session.uname){
            next();
        }else{
            req.flash("error", 'You must log in first');
            req.session.save(function(saveError){
                res.redirect('/login');
            })
        }
    }
};