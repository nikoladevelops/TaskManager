const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.render('notLoggedIn');
    }
    return next();
}

const isNotLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.render('index');
    }
    return next();
}

module.exports = {
    isLoggedIn,
    isNotLoggedIn
};