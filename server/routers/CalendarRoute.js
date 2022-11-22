const Router = require('express')
const router = new Router()
const CalendarController = require('../controllers/CalendarController')
const authcheck = require('../midleware/userAuth')


router.get('/', CalendarController.getAllCalendars)
router.post('/',CalendarController.createCalendar)
router.get('/:user_id', CalendarController.getCalendarById)
router.get('/share/:token',CalendarController.shareCalendarToUser)
router.post('/share/:calendar_id',CalendarController.shareCalendar)
router.patch(`/update/:calendar_id`, CalendarController.updateCalendar)
router.delete('/delete/:calendar_id/:user_id', CalendarController.deleteUserFromCalendar)

module.exports = router