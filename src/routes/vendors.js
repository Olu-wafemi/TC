const router = require('express').Router()
const controller = require('../controllers/restuarants')
const LoginRequired = require('../middleware/loginrequired')
const { validateRegister,
    validate_add_reviews,
    validate_fetch_by_id,
    add_restaurant_food_validation,
    validate_create_fetch_restaurant_foods,
    validate_update_food_status,
    validate_make_order,
    validate_add_shipping_details

 } = require('../utils/validators')
router.post('/register-restuarant',validateRegister,controller.register)
router.post('/fetch_restuarants_by_id',LoginRequired,validate_fetch_by_id,controller.fetch_restuarants_by_id)
router.get('/fetch_all_restaurants', LoginRequired,controller.fetch_all_restuarants)
router.post('/fetch_restaurant_by_name', LoginRequired,controller.fetch_restuarants_by_name)
router.post('/add_restaurant_food',add_restaurant_food_validation ,controller.add_restaurant_food)
router.post('/fetch_restuarant_foods',LoginRequired,LoginRequired,validate_create_fetch_restaurant_foods,controller.fetch_restuarant_foods)
router.post('/update_food_status',LoginRequired,validate_update_food_status,controller.update_food_status)
router.post('/add_reviews',LoginRequired, validate_add_reviews,controller.add_reviews)
router.post('/fetch_reviews',LoginRequired, controller.fetch_reviews)
router.post('/fetch_gallery',LoginRequired, controller.fetch_gallery)


exports.vendorRouter= router