const express = require("express")
const app = express()
const mongoose = require('mongoose')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const port = process.env.PORT || 3000

app.use(session({
    secret: 'Test',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // if this statement is true then session will not work
  }))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//database
const db = require('./config/keys').mongoURI
mongoose.connect(db,{useNewUrlParser:true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))
app.use(express.urlencoded({extended :false}))

// Connect flash
app.use(flash());


//Views
app.set("views","./views")
app.set('view engine','pug')
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    req.session.appName = req.sessionID
    next()
})
//Route
app.use("/",require("./router/index"))
app.use("/user",require("./router/userRoute"))







app.listen(port, () => {
    console.log(`My Server started on port ${ port }`);
});