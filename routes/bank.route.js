const express = require('express')
const { addBank, updateBank, deleteBank, allBank } = require('../controllers/bank.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/bank',requireLogin,addBank)
router.put('/bank/:id',requireLogin,updateBank)
router.delete('/bank/:id',requireLogin,deleteBank)
router.get('/bank',requireLogin,allBank)

module.exports = router