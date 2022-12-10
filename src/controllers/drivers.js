const {Drivers} = require('../models/drivers')

exports.register = async(req,res)=>{


    const {fullname} = req.body
    const {city} = req.body
    const {email} = req.body
    const {phone} = req.body
    const {monday, tuesday, wednesday, thursday, friday, saturday,sunday} = req.body
   
    const {under3km} = req.body
    const {under5km} = req.body
    const {car, tricycle, motorbike} = req.body
    

    const register = new Drivers({
        fullname: fullname,
        city: city,
        email: email,
        phone: phone,
        schedule:{
            monday:monday,
            tuesday: tuesday,
            wednesday:wednesday,
            thursday:thursday,
            friday:friday,
            saturday:saturday,
            sunday: sunday,
        },

        working_details: {
            under3km: under3km,
            under5km: under5km
        },
        transportation:{
            car: car,
            tricycle: tricycle,
            motorbike: motorbike
        }







    })

    register.save()

    return res.status(200).json({status: true, message: 'Registration Successful'})


}




