const router = require('express').Router()
const {validate_make_order,
validate_add_shipping_details} =  require('../utils/validators')
const LoginRequired = require('../middleware/loginrequired')
const controller = require('../controllers/checkout')

router.post('/make_order',LoginRequired, validate_make_order,controller.make_order)
router.post('/complete_order',LoginRequired, validate_add_shipping_details, controller.complete_purchase)
router.post('/order_notification',LoginRequired,controller.order_notification)
exports.checkoutRouter = router