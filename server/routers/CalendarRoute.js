const Router = require('express')
const router = new Router()
const CalendarController = require('../controllers/CalendarController')
const authcheck = require('../midleware/userAuth')


router.get('/', CalendarController.getAllCalendars)
router.get('/:user_id', CalendarController.getCalendarById)
router.get('/users/:calendar_id', CalendarController.getAllUsersByCalendar)
router.get('/share/:token',CalendarController.shareCalendarToUser)
router.get('/author/:calendar_id', CalendarController.getAuthorOfCalendar)

router.post('/',CalendarController.createCalendar)
router.post('/share/:calendar_id',CalendarController.shareCalendar)
router.post(`/hide/:calendar_id`, CalendarController.HideCalendar)
router.post('/import/:calendar_id', CalendarController.importCalendar)
router.patch(`/update/:calendar_id`, CalendarController.updateCalendar)
router.delete('/delete/:calendar_id/:user_id', CalendarController.deleteUserFromCalendar)
router.delete('/delete/:calendar_id/user/:user_id', CalendarController.deleteUserFromCalendarAccess)

module.exports = router