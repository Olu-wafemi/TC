const {Resturant}= require('../models/restuarants')
const {Foods} = require('../models/foods')
const {Orders} = require('../models/orders')
const {Reviews} = require('../models/reviews')
const {titlecase} = require('../utils/titlecase')
const {restuarantexists} = require('../utils/response')
const { User } = require('../models/users')
const {makepayment} = require('../utils/payment')


exports.make_order = async(req,res)=>{

    const {order_details} = req.body
    const user_id = req.user_id
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


exports.complete_purchase  = async(req,res)=>{

    const {order_id} = req.body
    const {country} = req.body
    const {address} = req.body
    const {state} = req.body
    const {city} = req.body
    const { zip_code} = req.body
    const {phone_number} = req.body
    const {order_note} = req.body   
    const user_id = req.user_id


   
    
    const user = await User.findOne({_id: user_id})

    
    const find = await Orders.findOne({_id: order_id})
    try{


    if(find){
        const payment_link = await makepayment(10, 'Oluwafemi', phone_number,'femio82@gmail.com')
        
            if ((find.shipping_details.length) >0){
                await Orders.findOneAndUpdate({_id:order_id},{
                    $set:{[`shipping_details.${0}`]:{
                        country:country,
                        address:address,
                        state:state,
                        city:city,
                        zip_code:zip_code,
                        phone_number:phone_number,
                        order_note:order_note

                    } }
                })

                return res.status(200).json({status: true, message: 'Successful', payment_link:payment_link })

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
        

        return res.status(200).json({status: true, message: 'Successful', payment_link:payment_link })
    }

    if(!find){

        return res.status(200).json({status: false, message: 'Invalid Order Id'})
    }
}
catch{
    return res.status(502).json({status:false, message: 'Network error'})
}

    
   



}


function randomStringAsBase64Url(size) {
    return base64url(crypto.randomBytes(size));
}
exports.order_notification = async(req,res)=>{

    const {order_id} = req.body
    const {user_id} =  req.body

    const order = (await Orders.findOne({_id:order_id}))
    const token = randomStringAsBase64Url(6)
    Sendorderdetails("Daramola",order.order_details,"Futa", "2348109616221")

    Sendsms("Daramola", order.order_details,"Futa", "2348109616221", token)

    return res.status(200).json('Done')







    


}