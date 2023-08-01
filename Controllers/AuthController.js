const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const jwtSecret = 'c6e1c39411'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const user = prisma.user
const cand = prisma.candidate
const comp = prisma.company
// app.use(cookieParser())

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
    // Check if username and password is provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await cand.findFirst({
            where: {
                username: username
            }
        })
        if (!user) {
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            bcrypt.compare(password, user.password).then(function (result) {

                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const id = cand.id
                    const token = jwt.sign(
                        {
                            id,
                            username,
                            password
                        },
                        jwtSecret,
                        {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    )


                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    })
                };


                result
                    ? res.status(200).json({
                        message: "Login successful",
                        user,
                    })
                    : res.status(400).json({ message: "Login not succesful" })
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}




const SignUpCand = async (req, res) => {
    const { username, password } = req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
        await cand.create({
            data: {
                username: username,
                password: password
            }
        }).then(user =>
            res.status(200).json({
                message: "User successfully created",
                user,
            })
        )
    } catch (err) {
        res.status(401).json({
            message: "User not successful created",
            error: error.mesage,
        })
    }
}


module.exports = {
    SignIn,
    SignUp,
    SignInCand,
    SignUpCand
}