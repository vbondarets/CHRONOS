const EventController = require('../controllers/EventController')
const Router = require('express')
const router = new Router()

router.get('/:calendar_id', EventController.getEventsByCalendarId)
router.get('/newest_events/:user_id', EventController.getNewestEventsByUser_id)

router.post('/:calendar_id', EventController.createEvent)
router.post('/share/:event_id', EventController.shareEvent)
router.post('/share/confirm/:token', EventController.submitSharing)

router.patch('/:calendar_id/update/:event_id', EventController.UpdateEvent)

router.delete('/:calendar_id/delete/:event_id', EventController.DeleteEvent)
router.delete('/delete/:event_id/:user_id', EventController.DeleteUserFromSharingEvent)

module.exports = router