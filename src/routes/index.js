const { vendorRouter } = require('./vendors')
const { driverRouter } = require('./drivers')
const { checkoutRouter } = require('./checkout')
const { authRouter  } = require('./auth')
const index = (app)=>{

    app.use('/api/vendors', vendorRouter)
    app.use('/api/drivers', driverRouter)
    app.use('/api/checkout', checkoutRouter)
    app.use('/api/auth', authRouter)
}

exports.index = index