const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({

    restuarantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restuarants'
    },
    food_name:{
        type: String

    },
    food_category:{
        type:String

    },
    food_image:{
        type: String

    },
    food_price:{
        type: Number

    },
    status: {
        type: String,
        default: 'available'
    }


    
})

exports.Foods = mongoose.model('foods', foodSchema)