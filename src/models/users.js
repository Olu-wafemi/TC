const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

   
    email:{
        type: String
    },
    password:{
        type: String
    },
    googleId:{
        type: String
    }


})

exports.User = mongoose.model('user', userSchema)