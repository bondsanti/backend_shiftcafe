const express = require('express')
const { addCustomer, updateCustomer, deleteCustomer, allCustomer, getCustomerById } = require('../controllers/customer.controller')
const { requireLogin, requireAdmin } = require('../middleware')
const router = express.Router()

router.post('/customer',requireLogin,addCustomer)
router.put('/customer/:id',requireLogin,updateCustomer)
router.delete('/customer/:id',requireLogin,deleteCustomer)
router.get('/customer',requireLogin,allCustomer)
router.get('/customer/:id',requireLogin,getCustomerById)


module.exports = router