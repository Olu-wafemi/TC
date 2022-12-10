const router = require('express').Router()

const controller = require('../controllers/drivers')
const {validate_register_driver} = require('../utils/validators')
 
router.post('/register-drivers', validate_register_driver,controller.register)

exports.driverRouter = router

