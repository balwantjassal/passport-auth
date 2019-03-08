const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
var user = require("../model/User")
var passport = require('passport')

router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",(req,res)=>{
    const { name, email, password, password2 } = req.body
    const errors = []
    if(!name || !email || !password){
        errors.push({msg:'No field should be left blank'})
    }
   
    if(errors.length > 0){
       res.render("register",{errors,name,email,password,password2})

    }else{
        user.findOne({ email:email})
        .then( User => {
            if(User){
                errors.push({msg:'Email id already registered'})
                res.send(errors)
            }else{

                const newUser = new user({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password
        
                })
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        newUser.password = hash
                        newUser.save()
                        .then(()=> console.log('User registered'))
                        .catch(err => console.log(err))
                        res.send(newUser)
                    })
                })
               
            }
        })
        .catch(err => console.log(err))
        
    }
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/user/login',
                                   failureFlash: false })
);
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
  });
  
module.exports=router

