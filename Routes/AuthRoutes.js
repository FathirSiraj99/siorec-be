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
router.post('/signincand',authenticateToken, (req, res) =>{
    res,SignInCand
})

router.post('/signin',authenticateToken, (req, res) =>{
    res,SignIn
})
router.post('/signupcand',SignUpCandd)

module.exports = router