const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { PrismaClient } = require('@prisma/client')
const { use } = require('../Routes/AuthRoutes')
const { create } = require('domain')
const prisma = new PrismaClient()
const user = prisma.user
const cand = prisma.candidate

const SignIn = async (req, res) => {
    //mengambil data dari metode post
    const { username, password } = req.body
    try {
        //mencari data user yang mencoba login
        const isUserValid = await user.findFirst({
            where: {
                username: username
            }
        })
        
        //mengecek apakah user nya ketemu atau tidak, jika tidak ketemu maka fungsi login ini akan berakhir
        if (!isUserValid) {
            return res.status(400).json({ msg: "user not found" })
        }

        //mengecek apakah password yang di ketikan user ketika post data itu sama dengan password yang didapat dari mengecek isUserValid
        const isPasswordValid = await bcrypt.compare(password, isUserValid.password)
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "password is not valid" })
        }

        //menggenerate token secara random
        const secretKey = crypto.randomBytes(10).toString('hex')
        const token = jwt.sign({ id: isUserValid.id }, secretKey)

        //mengecek user yang login itu siapa
        const getRole = await user.findFirst({
            where: {
                username: username
            }
        })

        const datas = {
            'token': token,
            'role': getRole.role
        }

        res.json(datas)

    } catch (error) {
        console.log(error)
    }
}

const SignUp = async (req, res) => {
    const { username, password, companyId } = req.body
    try {
        console.log(req.body)
        const isUserValid = await user.findFirst({
            where: {
                username: username,
            }
        })
        if (isUserValid) {
            return res.status(400).json({ msg: "username already in use" })
        }

    const hashPassword = await bcrypt.hash(password,8)
        await user.create({
            data: {
                username: username,
                password: hashPassword,
                companyId: companyId,
            }
        })

        res.json({ msg: "SignUp Success" })

    } catch (error ) {
            console.log(error)
    }

}

const SignInCand = async (req, res) => {
    
    const { username, password } = req.body
    try {

        const isCandValid = await cand.findFirst({
            where: {
                username: username
            }
        })

        if (!isCandValid) {
            return res.status(400).json({ msg: "Candidate not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, isCandValid.password)
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "password is not valid" })
        }
        const secretKey = crypto.randomBytes(10).toString('hex')
        const token = jwt.sign({ id: isCandValid.id }, secretKey)

        const getRole = await cand.findFirst({
            where: {
                username: username
            }
        })

        const datas = {
            'token': token,
        }

        res.json(datas)

    } catch (error) {
        console.log(error)
    }
}

const SignUpCand = async (req, res) => {
    const { username, password } = req.body
    try {
        const isCandValid = await cand.findFirst({
            where: {
                username: username,
            }
        })
        if (isCandValid) {
            return res.status(400).json({ msg: "username already in use" })
        }

    const hashPassword = await bcrypt.hash(password,8)
        await cand.create({
            data: {
                username: username,
                password: hashPassword,
            }
        })

        res.json({ msg: "SignUp Success" })

    } catch (error ) {
            console.log(error)
    }

}


module.exports = {
    SignIn,
    SignUp,
    SignInCand,
    SignUpCand
}