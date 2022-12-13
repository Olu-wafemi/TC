const passport = require('passport');
const passsport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const {User} = require('../models/users')
passport.serializeUser((user,done)=>{
    done(null,user.id)


})
passport.deserializeUser((id,done)=>{
    User.findOne({_id:id}).then((user)=>{
        done(null,user)

    })
    


})
passsport.use(
    new GoogleStrategy({
        callbackURL: 'api/auth/google/redirect',
        clientID: process.env.CLIENT_ID,

        clientSecret: process.env.CLIENT_SECRET,
        scope: ['email']


    }, 
    (accessToken,refreshToken,userinfo,done)=>{

        User.findOne({email:userinfo.emails[0].value}).then((exists)=>{
            if(exists){
                done(null,exists)

            }else{
                User.create({
                    email: userinfo.emails[0].value,
                    googleId: userinfo.id
                }).then((newuser)=>{
                    done(null, newuser)
                })
            }
        })
        

    })
)