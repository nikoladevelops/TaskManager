require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const tasks = require("./routes/tasks");
const userRoutes = require('./routes/users');

const connectDb = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const ejs = require('ejs');
app.set('view engine','ejs');
app.set('views','views');

// needed for Login/Register functionality
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

// middleware
const {isLoggedIn} = require('./middleware/loginChecker')
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// session set up
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store: MongoStore.create({mongoUrl:process.env.MONGO_URI}),
    cookie:{
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
}));

// passport set up
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use("/api/v1/tasks", tasks);
app.use('/', userRoutes);

app.get("/", isLoggedIn, (req,res)=>{
    res.render("index");
});

app.get('*',(req,res)=>{
    res.send('No such route exists.')
})

app.use(errorHandlerMiddleware);

// only start the server if we can connect to the DB
const start = async ()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log("Listening on port " + port);
        });
    } catch (error) {
        console.log(error);
    }
}

start();



