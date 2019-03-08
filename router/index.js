const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../config/auth")
router.get("/",(req,res)=>{
    res.render("welcome",{title:'Passport Testing',message:'Welcome to NodejS'})
})
router.get("/dashboard",ensureAuthenticated,(req,res)=>{
    
        res.render("dashboard",{user:req.user,sess:req.session})
    
    
})
module.exports=router

