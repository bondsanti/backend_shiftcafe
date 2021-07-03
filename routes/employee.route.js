const express = require('express')
const { addEmployee, updateEmployee, allEmployee, deleteEmployee } = require('../controllers/employee.controller')
const router = express.Router()

router.post("/employee",addEmployee)
router.put("/employee",updateEmployee)
router.get("/employee",allEmployee)
router.delete("/employee",deleteEmployee)

module.exports = router