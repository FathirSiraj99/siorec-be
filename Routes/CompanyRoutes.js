const express = require('express')
const {
    getAll, 
    getById,
    createCompany,
    updateCompany,
    deleteCompany
} = require('../Controllers/CompanyController')

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getById)
router.post('/create', createCompany)
router.patch('/update/:id', updateCompany)
router.delete('/delete/:id', deleteCompany)

module.exports = router