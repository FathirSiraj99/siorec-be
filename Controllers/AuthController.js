const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { PrismaClient } = require('@prisma/client')  
const prisma = new PrismaClient()
const user = prisma.user 

const SignIn = async (req, res) =>{
    const { username, password } = req.body
    try {
        const isUserValid = await user.findFirst({
            where:{
                username: username,
                password: password,
            }
        })

        if (!isUserValid) {
            return res.status(400).json({msg:"user not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, isPasswordValid.password)
            if (!isPasswordValid) {
                return res.status(400).json({msg:"password is not valid"})
            }
        
            const secretKey = crypto.randomBytes(10).toString('hex')
            const token = jwt.sign({id: isUserValid.id}, secretKey)
            const datas = {
                'token' : token,
            }

            res.json(datas)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    SignIn
}