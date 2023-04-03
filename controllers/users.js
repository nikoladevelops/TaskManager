const User = require('../models/User');
const passport = require('passport');

const getRegister = (req,res)=>{
    res.render('register');
}

const getLogin = (req,res)=>{
    res.render('login');
}

const postRegister = async (req,res,next)=>{
    try {
        // get the data that the user provides from req.body
        const {username, password:plainTextPassword, email} = req.body;
        
        //TODO make sure password and repeated password matches before registering a new user

        // create a new User object
        const user = new User({
            email,
            username
        });

        // register a new user
        // the method User.register() comes from passport-local-mongoose
        // generates a salt and a hash (using the pbkdf2 algorithm)
        // stores both the salt and the hash on the User object
        // save the user in the db 
        // (in this case User uses the default mongoose connection string)

        const registeredUser = await User.register(user, plainTextPassword);

        // after registering the user, log him in, just in case check for any errors
        req.logIn(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            res.redirect('/');
        })
        } catch (error) {
            next(error);
        }
}

// passport.authenticate uses User.authenticate
// what it does is
// parses req.body.username and req.body.password
// if a user with that username exists -> hash the password that the user provided
// check if that hash matches the hash saved in the db
// if it does -> valid login
// if it doesn't -> wrong login

const postLogin = passport.authenticate('local',{failureRedirect:'/error',successRedirect:'/'});


// Terminate the session and the user is no longer logged in.
const logout = async (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/');
    });
}

module.exports={
    getRegister,
    getLogin,
    postRegister,
    postLogin,
    logout
}