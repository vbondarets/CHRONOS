const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');

router.use('/auth', authRouter);


module.exports = router;