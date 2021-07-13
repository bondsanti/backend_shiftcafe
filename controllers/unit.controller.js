const { addLog } = require('./addLog.controller')
const UnitModel = require('./../models/unit.model')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')

exports.addUnit = (req,res)=>{
  //console.log(req.user._id)
    const { u_name } = req.body
    const newUnit = new UnitModel({
      u_name
    })
  
    newUnit.save(async(err, unit) => {
      if (err) {
        res.status(CODE_WARNING).json({
          message: 'Somthing went wrong',
          error: err
        })
      }
  
      if (unit) {
       await addLog(req.user._id, `add unit ${unit.u_name}`)
        res.status(CODE_COMPLETE).json({
          massage: 'add unit complete'
        })
      }
    })
}

exports.updateUnit = (req,res)=>{
    const {u_name} = req.body

    UnitModel.findByIdAndUpdate({_id:req.params.id},{u_name:u_name}).then(async(unit)=>{
       await addLog(req.user._id, `update unit => ${unit.u_name}`)
        res.status(CODE_COMPLETE).json({
            message:"update unit complete"
        })
    }).catch((e)=>{
        res.status(CODE_WARNING).json({
            message:"update unit uncomplete",
            error:e
        })
    })
}

exports.deleteUnit = async(req,res)=>{
    
    try{
       const unit = await UnitModel.findOneAndDelete({_id:req.params.id})
      await addLog(req.user._id, `delete unit => ${unit.u_name}`)
        res.status(CODE_COMPLETE).json({
            message:"delete unit complete"
        })
    }catch(e){
        res.status(CODE_WARNING).json({
            message:"delete unit uncomplete",
            error:e
        })
    }
}

exports.allUnit = (req,res)=>{
  UnitModel.find().then(unit=>{
    res.status(CODE_COMPLETE).json(unit)
  })
}