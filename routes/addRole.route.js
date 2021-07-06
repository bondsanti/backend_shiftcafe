const express = require('express')
const { addRole, updateRole, deleteRole } = require('../controllers/addRole.controller')
const router = express.Router()

router.post("/role",addRole)
router.put("/role/:id",updateRole)
router.delete("/role/:id",deleteRole)

module.exports = router