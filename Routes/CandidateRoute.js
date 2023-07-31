const express = require('express')
const {
    getAll,
    getById,
    updateCandidate,
    deleteCandidate,
    getViewData
} = require('../Controllers/CandidateControlller')

const router = express.Router()

router.get('/', getViewData)
router.get('/:id', getById)
router.patch('/update/:id', updateCandidate)
router.delete('/delete/:id', deleteCandidate)

module.exports = router