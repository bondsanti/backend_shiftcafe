const express = require('express')
const { addCustomer, updateCustomer, deleteCustomer, allCustomer, getCustomerById, allCustomer2, getCustomerByTel, checkAndUpdateLevelMember } = require('../controllers/customer.controller')
const { requireLogin, requireAdmin } = require('../middleware')
const router = express.Router()

router.post('/customer',requireLogin,addCustomer)
router.put('/customer/:id',requireLogin,updateCustomer)
router.delete('/customer/:id',requireLogin,deleteCustomer)
router.get('/customer',requireLogin,allCustomer)
router.get('/customer2',requireLogin,allCustomer2)
router.get('/customer/:id',requireLogin,getCustomerById)
router.get('/customer-tel/:id',requireLogin,getCustomerByTel)
router.get('/customer/check/:id',checkAndUpdateLevelMember)


module.exports = router