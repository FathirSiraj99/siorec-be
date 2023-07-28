const express = require('express')
const {
    getAll,
    getById,
    updateCandidate,
    deleteCandidate
} = require('../Controllers/CandidateControlller')
const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.patch('/updatee/:id', updateCandidate)
router.delete('/delete/:id', deleteCandidate)

module.exports = router