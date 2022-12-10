const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({

    fullname:{
        type: String
    },
    city:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        Number
    },
    schedule:[{
        monday:{type: Boolean},
        tuesday:{type: Boolean},
        wednesday:{type:Boolean},
        thursday:{type:Boolean},
        friday:{type:Boolean},
        saturday:{type: Boolean},
        sunday:{type:Boolean},
        _id:false



    }],
    working_details:[{
        under3km:{type: Boolean},
        under5km:{type: Boolean},
        _id:false
    }],
    transportation:[{
        car:{type: Boolean},
        tricycle:{type: Boolean},
        motorbike:{type:Boolean},
        _id:false
    }]
    
    


})

exports.Drivers = mongoose.model('drivers',driverSchema)