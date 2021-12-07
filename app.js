const express = require('express');
const authRoutes = require('./routes/auth-routes.js')
const profileRoutes = require('./routes/profile-routes.js')
const app = express();
const passportSetup = require('./config/passport-setup.js');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const cookieSession = require('cookie-session');
const passport= require('passport');
const bodyParser = require('body-parser');
const User = require('./models/user-models');
// set view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

//connect to db 

mongoose.connect(keys.mongodb.dbURI, ()=>{
    console.log("connect to mongoDB")
})

// set up routes

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
// create home route
app.get('/', (req, res) => {
    res.render('home',{user:req.user});
});

app.get('/edit',(req,res)=>{
    
    res.render('edit-user');
    

    
})
app.post('/edit',(req,res)=>{
    console.log("hitting post route")
    console.log(req.user.username)
    
    User.findOneAndUpdate({username: req.user.username}, {$set: { username: req.user.username, userType: req.body.category, googleId:req.user.googleId}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    });
    console.log(req.user.userType);
    console.log(req.body.category)
    res.redirect('/profile/');
    
})

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
