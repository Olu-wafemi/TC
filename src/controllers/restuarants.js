const {Resturant}= require('../models/restuarants')
const {Foods} = require('../models/foods')
const {Orders} = require('../models/orders')
const {Reviews} = require('../models/reviews')
const {titlecase} = require('../utils/titlecase')
const {restuarantexists} = require('../utils/response')



exports.register = async(req,res) =>{
    const {restuarant_name} = req.body
    const {city}  = req.body
    const {fullname} = req.body
    const {address} = req.body
    const {phone} = req.body
    const {email }  = req.body
    const {restuarant_phone } = req.body
    const { location }= req.body
    const {owner} = req.body
    const {manager } = req.body
    const {monday, tuesday, wednesday, thursday, friday, saturday,sunday} = req.body
    const {services } = req.body
    const {cuisine} = req.body
    const {payment_method}= req.body
    const {opened_already} = req.body
    const {opening_soon}  = req.body

    const new_name = titlecase(restuarant_name)


    try{
        const restuarant = new Resturant({restuarant_name: new_name,city: city,fullname:fullname,address: address,
        phone: phone, email: email,restuarant_phone: restuarant_phone,owner: owner,manager:manager,location: location, schedule:{
            monday:monday,
            tuesday: tuesday,
            wednesday:wednesday,
            thursday:thursday,
            friday:friday,
            saturday:saturday,
            sunday: sunday,
        },


           
            open_status: {
                opened_already: opened_already,
                opening_soon: opening_soon
            



        }})

       restuarant.cuisines.push({$each:cuisine} )
       restuarant.services.push({$each:services} )
       restuarant.payment_method.push({$each:payment_method} )
        restuarant.save()
        
    
    
        return res.status(200).json({status: false, message: "Registration Successful", data: restuarant })
    }catch{
        return res.status(502).json({'status': true, 'message': 'Network error'})
        

   }

        


    




}


exports.fetch_restuarants_by_id = async(req,res)=>{

    const {restuarant_id} = req.body
    const restuarant= await Resturant.findOne({_id: restuarant_id})
    if(!restuarant){
        return res.status(404).json({status:false, message: 'Restuarant does not exist'})
    }
    

    
    return res.status(200).json({status: true, message: 'Retrieved Successfully', data: restuarant})
    
   

    

}


exports.fetch_all_restuarants = async(req,res)=>{

    const restuarants = await Resturant.find()
    

    return res.status(200).json({status :true, "message": "Retrieved succesfully", data: restuarants})
}

exports.fetch_restuarants_by_name = async(req,res) =>{
    const {name} = req.body
    const new_name = titlecase(name)
    const get = await Resturant.findOne({restuarant_name: new_name})

    if(get){
        return res.status(200).json({status:true,message: 'Retrieved Succesfully', data: get })
    }
    if(!get){
        return res.status(404).json({status:false, message: 'Restuarant not found'})
    }

}


exports.add_restaurant_food = async (req,res)=>{

    const {restuarant_id } = req.body

    const check = await Resturant.findOne({_id: restuarant_id})
    if(!check){
        return res.status(404).json({status:false, message: 'Invalid Restaurant Id'})
    }
    

    const {food_name} = req.body
    const {food_category} = req.body
    const {food_price} = req.body
    //const {food_image} = req.body
   try{ 

    const add_food = new Foods({restuarantId: restuarant_id, food_name: food_name,food_category: food_category,food_price: food_price})
    add_food.save()
    const id = add_food._id
    

    const update = await Resturant.findOneAndUpdate({_id : restuarant_id}, {
        $push: {
            foods: id
        }
    })

    return res.status(200).json({status : true, message: 'Successful', data: add_food})
}
catch{
    return res.status(502).json({'status': true, 'message': 'Network error'})

}
}

exports.fetch_restuarant_foods = async(req,res)=>{
    const {restuarant_id} = req.body
    
    const check = await Resturant.findOne({_id: restuarant_id})
    if(!check){
        return res.status(404).json({status:false, message: 'Invalid Restaurant Id'})
    }

    try{

        const foods = await Resturant.findOne({_id: restuarant_id}).populate("foods"," food_name food_price food_category food_image status")


        return res.status(200).json({status: true, message: 'Retrived successfully', data: foods.foods})


    }

    catch{
        return res.status(502).json({'status': true, 'message': 'Network error'})

    }


}

exports.update_food_status= async(req,res)=>{
    const {food_id} = req.body
    const {status} = req.body

    const check = await Foods.findOne({_id: food_id})
    if(!check){
        return res.status(404).json({status:false, message: 'Invalid food Id'})
    }


    const update = await Foods.findOneAndUpdate({_id: food_id}, {status: status})

    return res.status(200).json({status: true, message: 'Updated Successfully'})
}

exports.add_reviews = async(req,res)=>{

    const user_id = req.user_id
    const {username} = req.body
    const {restuarant_id} = req.body
    const {content} = req.body
    const {date}= req.body
    const {rating} = req.body

    const add_rating = new Reviews({username: username, userId: user_id, restuarant_id:restuarant_id, rating: rating, content:content, date: date})
    add_rating.save()
    await Resturant.findOneAndUpdate({_id: restuarant_id},{
        $push:{
            reviews: add_rating._id
        }
    })

    return res.status(200).json({status: true, message: 'Review Recorded Successfully'})




}

exports.fetch_reviews = async(req,res)=>{

    const {restuarant_id} = req.body
    await restuarantexists(res,restuarant_id)

    const reviews = await Reviews.find().where({restuarant_id: restuarant_id})

    return res.status(200).json({status: true, message: 'Retrieved Successfully', data: reviews})
}

exports.fetch_gallery = async(req,res) =>{

    const {restuarant_id } = req.body


    const gallery = await Resturant.findOne({_id : restuarant_id})

    return res.status(200).json({status: true,message: 'Retrieved Successfully', data: gallery})
}



exports.make_order = async(req,res)=>{

    const {order_details} = req.body
    const user_id= req.user_id
    const {sub_total} = req.body
    const {delivery_fee} = req.body





    const order = new Orders({
        
        userId: user_id,
        Sub_total: sub_total,
        delivery_fee: delivery_fee
        


    })
    order.order_details.push({$each:order_details})

    order.save()

    return res.status(200).json({status:true, message: "Order Saved Successfully", data:order})
}


exports.add_shipping_details = async(req,res)=>{

    const {order_id} = req.body
    const {country} = req.body
    const {address} = req.body
    const {state} = req.body
    const {city} = req.body
    const { zip_code} = req.body
    const {phone_number} = req.body
    const {order_note} = req.body   
   

   
    
    
    const find = await Orders.findOne({_id: order_id})
   

    if(find){
        const check_shipping_details = await Orders.findOne({_id:order_id})
     
        if (check_shipping_details.shipping_details.length !=0){
            return res.status(401).json({status:false, message: "Shipping details already added for this Order"})
        }

        const update = await Orders.findOneAndUpdate({_id: order_id},{
            $push:{
                shipping_details:{
                    country: country,
                    address: address,
                    state : state,
                    city: city,
                    zip_code: zip_code, 
                    phone_number: phone_number,
                    order_note: order_note
                }
            }

        })

        return res.status(200).json({status: true, message: 'Shippping details added successfully',find})
    }

    if(!find){

        return res.status(200).json({status: false, message: 'Invalid Order Id'})
    }

    
   



}

