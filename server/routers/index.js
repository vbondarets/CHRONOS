const Router = require('express')

const userRoutes=require('./userRouters')
const authorizationRoutes=require('./authorizationRouters')

const router = new Router()

router.use('/api/auth', authorizationRoutes)
router.use('/api/users', userRoutes)


module.exports = router