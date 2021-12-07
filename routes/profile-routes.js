const router = require('express').Router();
const User = require('../models/user-models');
var bodyParser = require('body-parser');
const authCheck = (req,res,next)=>{
    if(!req.user){
        res.redirect('auth/login');
    }
    else 
    next();
}



router.get('/',authCheck, (req,res)=>{
    if(req.user && req.user.userType===null)
    {
        res.redirect('/edit');
    }
    
    
    
    res.render('profile',{user:req.user});
})

module.exports = router;