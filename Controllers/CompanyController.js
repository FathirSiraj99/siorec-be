const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient()
const company = Prisma.company

const getAll = async (req, res) => {
    try {
        const data = await company.findMany()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await company.findUnique(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const createCompany = async (req, res) => {
    const { name, address, email, phone} = req.body
    try {
        await company.create({
            data: {
                name: name,
                address: address,
                email:email,
                phone: phone
            }
        })
        res.status(201).json({ msg: "User Created" })
    } catch (error) {
        console.log(error)
    }
}

const updateCompany = async (req, res) => {
    const { id } = req.params
    const { name, address, email, phone } = req.body
    try {
        await company.update({
            where: {
                id: id
            },
            data: {
                name: name,
                address: address,
                email: email,
                phone:phone
            }
        })
        res.status(200).json({ msg: "Company Updateted" })
    } catch (error) {
        console.log(error)
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params
        await company.delete(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).json({ msg: "User Deleted" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAll,
    getById

}