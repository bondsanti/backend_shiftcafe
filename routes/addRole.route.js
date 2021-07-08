const express = require('express')
const { allLog } = require('../controllers/addLog.controller')
const { addRole, updateRole, deleteRole } = require('../controllers/addRole.controller')
const router = express.Router()

router.post("/role",addRole)
router.put("/role/:id",updateRole)
router.delete("/role/:id",deleteRole)
router.get("/log",allLog)

module.exports = router