const express = require('express')
const { allLog } = require('../controllers/addLog.controller')
const { addRole, updateRole, deleteRole, allRole } = require('../controllers/addRole.controller')
const { requireLogin, requireAdmin } = require('../middleware')
const router = express.Router()

router.post("/role",requireLogin,addRole)
router.put("/role/:id",requireLogin,updateRole)
router.delete("/role/:id",requireLogin,deleteRole)
router.get("/log",requireLogin,requireAdmin,allLog)
router.get("/role",requireLogin,allRole)


module.exports = router