const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const user = prisma.user

const SignIn = async (req, res) => {
    //mengambil data dari metode post
    const { username, password } = req.body
    try {
        //mencari data user yang mencoba login
        const isUserValid = await user.findFirst({
            where: {
                username: username,
                password: password,
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
            'role': getRole.role,
        }

        res.json(datas)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    SignIn
}