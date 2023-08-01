const express = require('express')

const { authenticateToken } = require('../Middleware/Auth')

const { 
    SignIn,
    SignUp,
    SignInCand,
    SignUpCand
} = require('../Controllers/AuthController')

const router = express.Router()

router.post('/signin',authenticateToken, (req, res) =>{
    res,SignIn
})
router.post('/signup',SignUp)
router.post('/signincand',SignInCand)

router.post('/signin',authenticateToken, (req, res) =>{
    res,SignIn
})
router.post('/signupcand',SignUpCand)

module.exports = router