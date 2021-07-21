const express = require('express')
const {
  addEmployee,
  updateEmployee,
  allEmployee,
  deleteEmployee,
  getEmployeeByUsername
} = require('../controllers/employee.controller')
const { requireLogin, requireAdmin } = require('../middleware')
const router = express.Router()

router.post('/employee', requireLogin, requireAdmin, addEmployee)
router.put('/employee/:id', requireLogin, requireAdmin, updateEmployee)
router.get('/employee', requireLogin,allEmployee)
router.delete('/employee/:id', requireLogin, requireAdmin, deleteEmployee)
router.get('/employee/:username', requireLogin,getEmployeeByUsername)

module.exports = router
