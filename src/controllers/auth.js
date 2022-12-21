const jwt = require('jsonwebtoken')
const bcrpt = require('bcrypt')
const passportfuncion = require('../utils/passport-config')
const {User} = require('../models/users')
const passport = require('passport')

exports.signup = async(req,res) =>{

    const {email, password} = req.body
    

    const existing_user = await User.findOne({email: email.toLowerCase()})
    if(existing_user){
        return res.status(404).json({status: false, message: 'email already exists'})


    }

    const hashedpass = await  bcrpt.hash(password, 10)
    const user_data =await User.create({email: email.toLowerCase(), password:hashedpass})
    const user_id = user_data._id
    const token =   jwt.sign({email,hashedpass,user_id },process.env.SECRET_KEY,{expiresIn: '1h'})

    return res.status(200).json({status:true, message: 'Signup Successful',  user_data, accessToken: token})



}

exports.signin= async(req,res)=>{
    const {email, password} = req.body
    
    const check_user = await User.findOne({email:email.toLowerCase()})
    
    if(!check_user){
        return res.status(404).json({status: false, message: 'Invalid email address'})
    }

    const compare = await bcrpt.compare(password, check_user.password)
    if(!compare){
        return res.status(404).json({status:false, message: 'Password is Incorrect'})

    }
    const user_id = check_user._id

    const token =   jwt.sign({email, user_id},process.env.SECRET_KEY,{expiresIn: '1h'})

    return res.status(200).json({status: true, message: "Login Successful", user_data:check_user,accessToken: token})
}
exports.googlesignin = (req,res)=>{
    const details = passportfuncion
}