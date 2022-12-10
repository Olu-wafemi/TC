const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({

    username:{
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restuarant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restuarants'
    },
    rating:{
        type: String
    },
    content:{
        type: String
    
    },
    date:{
        type: String
    }



})

exports.Reviews= mongoose.model('reviews', reviewSchema)
