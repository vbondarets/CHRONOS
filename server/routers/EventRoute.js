const EventController = require('../controllers/EventController')
const Router = require('express')
const router = new Router()

router.get('/:calendar_id', EventController.getEventsByCalendarId)
router.post('/:calendar_id', EventController.createEvent)
router.post('/share/:event_id', EventController.shareEvent)
router.post('/share/confirm/:token', EventController.submitSharing)
router.patch('/:calendar_id/update/:event_id', EventController.UpdateEvent)
router.delete('/:calendar_id/delete/:event_id', EventController.DeleteEvent)
module.exports = router