const express = require('express')

const { 
    SignIn,
    SignUp,
    SignInCand,
    SignUpCand
} = require('../Controllers/AuthController')

const router = express.Router()

router.post('/signin',SignIn)
router.post('/signup',SignUp)
router.post('/signincand',SignInCand)
router.post('/signupcand',SignUpCand)

module.exports = router