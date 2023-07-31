const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient()
const candidate = Prisma.candidate

const getViewData = async (req, res) => {
    try {
        const rawQuery = await Prisma.$queryRawUnsafe
            (
                `SELECT candidate.username as username, candidate.id as id, company.name as company FROM candidate INNER JOIN company ON company.id = candidate.companyId`
            )
        console.log(rawQuery)
        const datas = {
            'data': rawQuery
        }
        res.json(datas)
    } catch (error) {
        console.log(error)
    }
}

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

const updateCandidate = async (req, res) => {
    const { id } = req.params
    const { username, companyId } = req.body
    try {
        await candidate.update({
            where: {
                id: id
            },
            data: {
                username: username,
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
    updateCandidate,
    deleteCandidate,
    getViewData
} 