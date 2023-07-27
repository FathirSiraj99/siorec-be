const express = require('express')

const { SignIn } = require('../Controllers/AuthController')

const router = express.Router()

router.post('/login',SignIn)

module.exports  = router