const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient()
const candidate = Prisma.candidate

const getAll = async (req, res) => {
    try {
        const data = await candidate.findMany()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await candidate.findUnique(
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

const createCandidate = async (req, res) => {
    const { name, companyId } = req.body
    try {
        await candidate.create({
            data: {
                name: name,
                companyId: companyId
            }
        })
        res.status(201).json({ msg: "Candidate Created" })
    } catch (error) {
        console.log(error)
    }
}

const updateCandidate = async (req, res) => {
    const { id } = req.params
    const { name, companyId } = req.body
    try {
        await candidate.update({
            where: {
                id: id
            },
            data: {
                name: name,
                companyId: companyId
            }
        })
        res.status(200).json({ msg: "Candidate Updated" })
    } catch (error) {
        console.log(error)
    }
}

const deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params
        await candidate.delete(
            {
                where: {
                    id: id
                }
            }
        )
        res.status(200).json({ msg: "Candidate Deleted" })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAll,
    getById,
    createCandidate,
    updateCandidate,
    deleteCandidate
}