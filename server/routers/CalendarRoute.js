const Router = require('express')
const router = new Router()
const CalendarController = require('../controllers/CalendarController')
const authcheck = require('../midleware/userAuth')


router.get('/', CalendarController.getAllCalendars)
router.post('/',CalendarController.createCalendar)

module.exports = router