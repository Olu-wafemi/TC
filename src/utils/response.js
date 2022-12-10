const{ Resturant } = require('../models/restuarants')


exports.restuarantexists =async (res,id)=>{

    const check = await Resturant.findOne({_id: id})
    if(!check){
        return res.status(404).json({status:false, message: 'Invalid Restaurant Id'})
    }
    


}

