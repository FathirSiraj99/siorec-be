const express = require('express')
const {
    getAll,
    getById,
    createCandidate,
    updateCandidate,
    deleteCandidate
} = require('../Controllers/CandidateControlller')
const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/create', createCandidate)
router.patch('/updatee/:id', updateCandidate)
router.delete('/delete/:id', deleteCandidate)

<<<<<<< HEAD
module.exports = router

=======
module.exports = router
>>>>>>> e5d9c738a8caa0d88528bfe37ae239af90011ae2
