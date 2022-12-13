const mongoose = require('mongoose')


const resturantSchema = new mongoose.Schema({

    restuarant_name:{
        type: String
    
    },
    city: {
        type: String
    },
    fullname:{
        type: String
    },
    image:{
        type: String
    },
    address:{
        type:String

    },
    phone:{
        type: Number
    },
    email:{
        type: String
    },
    restuarant_phone:{
        type: String
    },
    owner:{
        type: Boolean
    },
    manager:{
        type: Boolean
    },
    location:{
        type: String
    },

    schedule:[{
        monday:{type: Boolean},
        tuesday:{type: Boolean},
        wednesday:{type:Boolean},
        thursday:{type:Boolean},
        friday:{type: Boolean},
        saturday:{type: Boolean},
        sunday:{type:Boolean},
        _id: false



    }],
    services:{
        type: Array
    },
    cuisines:{
        type: Array
    },
    payment_method:{
        type: Array
    },
    open_status:[{
        opened_already:{type: Boolean},
        opening_soon:{type:Boolean},
        _id:false

    }],
    gallery:[

    ],
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }],


    foods:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foods'

    }],
    restuarant_image: {
        type: String
    }

    

})

exports.Resturant = mongoose.model('restuarants', resturantSchema)