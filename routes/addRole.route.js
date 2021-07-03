const express = require('express')
const { addRole, updateRole, deleteRole } = require('../controllers/addRole.controller')
const router = express.Router()

router.post("/role",addRole)
router.put("/role",updateRole)
router.delete("/role",deleteRole)

module.exports = router