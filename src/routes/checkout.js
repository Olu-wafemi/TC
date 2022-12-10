const router = require('express').Router()
const {validate_make_order,
validate_add_shipping_details} =  require('../utils/validators')

const controller = require('../controllers/checkout')

router.post('/make_order', validate_make_order,controller.make_order)
router.post('/complete_order',validate_add_shipping_details, controller.complete_purchase)

exports.checkoutRouter = router