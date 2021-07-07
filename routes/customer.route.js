const express = require('express')
const { addCustomer, updateCustomer, deleteCustomer, allCustomer } = require('../controllers/customer.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/customer',requireLogin,addCustomer)
router.put('/customer/:id',requireLogin,updateCustomer)
router.delete('/customer/:id',requireLogin,deleteCustomer)
router.get('/customer',allCustomer)


module.exports = router