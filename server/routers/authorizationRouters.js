const Router = require('express')
const router = new Router()
const auth = require('../controllers/authControllers')
const Auth = new auth()
const authcheck = require('../midleware/userAuth')


router.post('/register', Auth.register)
router.post('/login',Auth.login)
router.post('/logout',authcheck(),Auth.logout)
router.post('/password-reset',Auth.resetPassword)
router.post('/password-reset/:confirm_token',Auth.confirm)

module.exports = router