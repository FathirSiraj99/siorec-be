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
router.get("/logout/:id", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  })    

module.exports = router