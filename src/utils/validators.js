
var JOI = require('joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = JOI.extend(joiPasswordExtendCore);

JOI.objectId = require('joi-objectid')(JOI)
const options = {
    errors: {
      wrap: {
        label: ''
      }
    }
  };


const createvalidateSignUp= (payload)=>{
    const schema = JOI.object({
        email: JOI.string().email().required(),
        password:  joiPassword
        .string()
        .minOfSpecialCharacters(1)
        
        .minOfUppercase(1)
        .minOfNumeric(1)
        .min(8)
        .noWhiteSpaces()

        
        .required(),
    })
    return schema.validate(payload,options, { allowUnknown: false})

}
exports.validateSignUp = (req,res,next)=>{
    const validate = createvalidateSignUp(req.body)
    if (validate.error){
        const message = validate.error.details[0].message
        
        return res.status(400).json({status:false, message})
    }
    return next();
}
const createvalidateSignin = (payload)=>{
    const schema = JOI.object({

        email: JOI.string().email().required(),
        password: JOI.string().min(4).required()

    })

    return schema.validate(payload,options, { allowUnknown: false})

}
exports.validateSignIn = (req,res,next)=>{
    const validate = createvalidateSignin(req.body)
    if (validate.error){
        const message = validate.error.details[0].message
        
        return res.status(400).json({status:false, message})
    }
    return next();
}

const createvalidateRegister = (payload) =>{
    const schema = JOI.object({
        restuarant_name: JOI.string().min(5).required(),

        city: JOI.string().min(3).required(),
        fullname: JOI.string().min(3).required(),
        address: JOI.string().min(5).required(),
        phone: JOI.number().min(9).required(),
        email: JOI.string().email().required(),
        restuarant_phone: JOI.number().min(4).required(),
        location: JOI.string().min(5).required(),
        services: JOI.array().required(),
        cuisine: JOI.array().required(),
        payment_method: JOI.array().required(),


        monday: JOI.boolean().required(),
        tuesday: JOI.boolean().required(),
        wednesday: JOI.boolean().required(),
        thursday: JOI.boolean().required(),
        friday: JOI.boolean().required(),
        saturday: JOI.boolean().required(),
        sunday: JOI.boolean().required(),
        owner: JOI.boolean().required(),
        manager: JOI.boolean().required(),
        opened_already: JOI.boolean().required(),
        opening_soon: JOI.boolean().required()




    }).required()

    return schema.validate(payload,options, { allowUnknown: false})



}
exports.validateRegister = (req,res,next)=>{
    const validate = createvalidateRegister(req.body)
    if (validate.error){
        const message = validate.error.details[0].message
        
        return res.status(400).json({status:false, message})
    }
    return next();
}

const register_driver = (payload)=>{
    const schema = JOI.object({
        fullname: JOI.string().min(3).required(),
        city: JOI.string().required(),
        email: JOI.string().email().required(),
        phone: JOI.number().required(),
        monday: JOI.boolean().required(),
        tuesday: JOI.boolean().required(),
        wednesday: JOI.boolean().required(),
        thursday: JOI.boolean().required(),
        friday: JOI.boolean().required(),
        saturday: JOI.boolean().required(),
        sunday: JOI.boolean().required(),
        under3km: JOI.boolean().required(),
        under5km: JOI.boolean().required(),
        car: JOI.boolean().required(),
        tricycle: JOI.boolean().required(),
        motorbike: JOI.boolean().required()


    })
    return schema.validate(payload,options,{allowUnknown:false})
}

exports.validate_register_driver = (req,res,next)=>{
    const validate = register_driver(req.body)
    if(validate.error){
        const message = validate.error.details[0].message
        return res.status(400).json({status:false, message})
    }
    return next();

}

const create_fetch_by_Id_validation = (payload)=>{
    const schema = JOI.object({
        restuarant_id: JOI.objectId()
    }).required()

    return schema.validate(payload,options,{allowUnknown: false})

}

exports.validate_fetch_by_id  = (req,res, next)=>{

    const validate = create_fetch_by_Id_validation(req.body)
    if(validate.error){
        const message = validate.error.details[0].message
        return res.status(400).json({status:false, message})
    }
    return next()
}

const add_restaurant_food = (payload) =>{
    const schema = JOI.object({
        restuarant_id: JOI.objectId(),
        food_name: JOI.string().required(),
        food_category: JOI.string().required(),
        food_price: JOI.number().required(),



    }).required()

    return schema.validate(payload,options,{allowUnknown:false})
}

exports.add_restaurant_food_validation =(req,res,next) =>{
    const validate = add_restaurant_food(req.body)
    if(validate.error){
        const message = validate.error.details[0].message
        return res.status(400).json({status:false, message})
    }
    return next();
}

const create_fetch_restaurant_foods = (payload)=>{
    const schema = JOI.object({
        restuarant_id: JOI.objectId()
    }).required()

    return schema.validate(payload,options,{allowUnknown: false})

}

exports. validate_create_fetch_restaurant_foods  = (req,res, next)=>{

    const validate = create_fetch_restaurant_foods(req.body)
    if(validate.error){
        const message = validate.error.details[0].message
        return res.status(400).json({status:false, message})
    }
    return next();
}

const update_food_status = (payload)=>{
    const schema = JOI.object({
        food_id: JOI.objectId(),
        status: JOI.string().required()

    }).required()

    return schema.validate(payload,options,{allowUnknown: false})

}

exports.validate_update_food_status  = (req,res, next)=>{

    const validate = update_food_status(req.body)
    if(validate.error){
        const message = validate.error.details[0].message
        return res.status(400).json({status:false, message})
    }
    return next();
}
const make_order = (payload)=>{
    const schema = JOI.object({
        order_details: JOI.array().required(),
        user_id: JOI.objectId(),
        sub_total: JOI.number().min(3).required(),
        delivery_fee: JOI.number().min(3).required()


    }).required()

    return schema.validate(payload,options,{allowUnknown: false})

}

exports.validate_make_order  = (req,res, next)=>{

    const validate = make_order(req.body)
    if(validate.error){
        const message = validate.error.details[0].message
        return res.status(400).json({status:false, message})
    }
    return next();
}

const add_shipping_details = (payload) =>{
    const schema = JOI.object({
        order_id: JOI.objectId(),
        country: JOI.string(),
        address: JOI.string().required(),
        state: JOI.string(),
        city: JOI.string().required(),
        zip_code: JOI.string().allow(null, ''),
        phone_number: JOI.number().required(),
        order_note:JOI.string().allow(null, ''),
        user_id: JOI.objectId()
    }).required()
    return schema.validate(payload,options,{allowUnknown:false})

}

exports.validate_add_shipping_details = (req,res,next)=>{
    const validate = add_shipping_details(req.body)
    if(validate.error){
        const message  = validate.error.details[0].message
        return res.status(400).json({status:false, message})
    }
    return next();
}

const add_reviews = (payload)=>{

    const schema = JOI.object({
        user_id: JOI.objectId(),
        username: JOI.string().required(),
        restuarant_id: JOI.objectId(),
        content: JOI.string().min(3).required(),
        date: JOI.date().iso().messages({ 'date.format':`Date format is YYYY-MM-DD`}).required()


    })
    return schema.validate(payload,options,{allowUnknown:false})
}

exports.validate_add_reviews = (req,res,next)=>{
    const validate = add_reviews(req.body)
    if(validate.error){
        const message = validate.error.details[0].message
        return res.status(400).json({status:false,message})
    }
    return next();
}

