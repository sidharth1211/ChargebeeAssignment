const router = require('express').Router();
const passport = require('passport');
router.get('/login',(req,res)=>{
    res.render('login');
});

// logut
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});
// auth with google

router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));


router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    
    // res.send(req.user);
    res.redirect("/profile/");
})

module.exports = router;