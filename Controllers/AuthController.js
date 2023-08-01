const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const user = prisma.user
const cand = prisma.candidate
const comp = prisma.company

const SignIn = async (req, res) => {
    const { username, password } = req.body
    try {
        const isUserValid = await user.findFirst({
            where: {
                username: username
            }
        })

        if (!isUserValid) {
            return res.status(400).json({ msg: "user not found" })
        }

        const isPasswordValid = await bcrypt.compare(password, isUserValid.password)

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "password is not valid" })
        }

        const secretKey = crypto.randomBytes(10).toString('hex')
        const token = jwt.sign({ id: isUserValid.id }, secretKey)

        const getRole = await user.findFirst({
            where: {
                username: username
            }
        })

        const getCompany = await comp.findFirst({
            where: {
                id: getRole.companyId
            }
        })

        console.log(getCompany)
        
        const datas = {
            'token': token,
            'role': getRole.role,
            'id': getCompany.id
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

        const hashPassword = await bcrypt.hash(password, 8)
        await user.create({
            data: {
                username: username,
                password: hashPassword,
                companyId: companyId,
            }
        })

        res.json({ msg: "SignUp Success" })

    } catch (error) {
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

        const hashPassword = await bcrypt.hash(password, 8)
        await cand.create({
            data: {
                username: username,
                password: hashPassword,
            }
        })

        res.json({ msg: "SignUp Success" })

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    SignIn,
    SignUp,
    SignInCand,
    SignUpCand
}