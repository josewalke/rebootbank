const router = require('express').Router()
const {
  autAdmin
} = require('../middleware/authentication')
const {
  login,
  signup
} = require('../controlers/auth.controller')

router.post('/signup',autAdmin, signup)
router.post('/login', login)

module.exports = router
