const { vendorRouter } = require('./vendors')
const { driverRouter } = require('./drivers')
const { checkoutRouter } = require('./checkout')
const index = (app)=>{

    app.use('/api/vendors', vendorRouter)
    app.use('/api/drivers', driverRouter)
    app.use('/api/checkout', checkoutRouter)
}

exports.index = index