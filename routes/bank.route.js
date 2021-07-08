const express = require('express')
const { addBank, updateBank, deleteBank } = require('../controllers/bank.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/bank',requireLogin,addBank)
router.put('/bank/:id',requireLogin,updateBank)
router.delete('/bank/:id',requireLogin,deleteBank)

module.exports = router