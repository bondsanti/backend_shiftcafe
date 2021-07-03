const express = require('express')
const { login } = require('../controllers/authen.controller')
const router = express.Router()

router.post("/authen",login)
router.get("/authen",(req,res)=>{
    //console.log(req.emp)
})

module.exports = router