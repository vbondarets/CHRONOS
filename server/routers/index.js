const Router = require('express')

const userRoutes=require('./userRouters')
const authorizationRoutes=require('./authorizationRouters')
const CalendarRoutes = require('./CalendarRoute')
const EventRoute = require('./EventRoute')

const router = new Router()

router.use('/api/auth', authorizationRoutes)
router.use('/api/users', userRoutes)
router.use('/api/calendar', CalendarRoutes)
router.use('/api/event', EventRoute)


module.exports = router