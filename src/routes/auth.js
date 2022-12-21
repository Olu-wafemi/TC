const router = require('express').Router()
const passport = require('passport')
const controller = require('../controllers/auth')
const {validateSignIn, validateSignUp} = require('../utils/validators')
const jwt = require('jsonwebtoken')

router.post('/signup',validateSignUp,controller.signup)
router.post('/signin',validateSignIn,controller.signin)
router.get('/google', passport.authenticate('google',
))
router.get('/google/redirect', passport.authenticate('google',{
    session: false
}),(req,res)=>{
    const email = req.user.email
    const user_id = req.user._id
    
    const token =   jwt.sign({email, user_id},process.env.SECRET_KEY,{expiresIn: '1h'})
    

    return res.status(200).json({status: true, message: "User Successfully Authenticated", accessToken: token})
    
})
exports.authRouter = router
