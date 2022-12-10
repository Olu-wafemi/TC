const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fullname:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    }


})

exports.User = mongoose.model('user', userSchema)