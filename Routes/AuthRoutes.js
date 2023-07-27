const express = require('express')

const { SignIn, SignUp } = require('../Controllers/AuthController')

const router = express.Router()

router.post('/signin',SignIn)
router.post('/signup',SignUp)

module.exports  = router