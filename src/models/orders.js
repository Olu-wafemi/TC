const mongoose = require('mongoose')


const orderSchema =new  mongoose.Schema({
    order_details:[{
        food_name:{type:String},
        unit_price:{type: String},
        quantity:{type: String},
        total:{type :String},
        restuarant_name:{type : String},
        _id:false


    }],
    userId:{
        type: String
    },

    Sub_total:{
        type: Number
        
    },
    shipping_details:[{
        country:{type: String},
        address:{ type : String},
        state:{type: String},
        city: {type: String},
        zip_code:{type :String},
        phone_number:{type :String},
        order_note:{type:String},
        _id:false


    }],
    delivery_fee:{
        type: Number
    },
    order_status:{
        type: String,
        default:'In Progress'
    }





})


exports.Orders = mongoose.model('orders', orderSchema)