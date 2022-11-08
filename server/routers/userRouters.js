const Router = require('express')
const router = new Router()
const user = require("../controllers/userController")
const auth = require('../midleware/userAuth')
const checkAdmin = require('../midleware/adminCheck')

router.get('/',user.getUsers)
router.get('/:user_id',user.getUserbyID)
router.get(`/rating/:user_id`, user.getRating)
router.post('/',checkAdmin('admin'),user.createUser)
router.patch('/avatar',auth(),user.updateAvatar)
router.patch('/:user_id', auth(),user.updateUserData)
router.delete('/:user_id',auth(),user.deleteUserr)

module.exports = router
