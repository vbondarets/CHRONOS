const Router = require('express')
const router = new Router()
const CalendarController = require('../controllers/CalendarController')
const authcheck = require('../midleware/userAuth')


router.get('/', CalendarController.getAllCalendars)
router.post('/',CalendarController.createCalendar)
router.get('/:user_id', CalendarController.getCalendarById)
router.post('/share/:calendar_id',CalendarController.shareCalendar)


module.exports = router