const router = require('express').Router()
const auth = require('../middleware/auth')

const { registerUser, loginUser, getCurrentUser } = require('./controller')

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/getuser', auth, getCurrentUser)

module.exports = router
