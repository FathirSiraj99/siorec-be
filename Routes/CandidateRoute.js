const express = require('express')
const {
    getAll,
    getById,
    updateCandidate,
    deleteCandidate,
    getViewData
} = require('../Controllers/CandidateControlller')

const {
    superAdmin,
    companyAdmin
}  = require('../Middleware/Auth')

const router = express.Router()

router.get('/', superAdmin,companyAdmin,getAll)
router.get('/view', getViewData)
router.get('/:id', getById)
router.patch('/update/:id', updateCandidate)
router.delete('/delete/:id', deleteCandidate)

module.exports = router