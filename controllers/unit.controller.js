const { addLog } = require('./addLog.controller')
const UnitModel = require('./../models/unit.model')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')

exports.addUnit = (req,res)=>{
    const { u_name } = req.body
    const newUnit = new UnitModel({
      u_name
    })
  
    newUnit.save((err, unit) => {
      if (err) {
        res.status(CODE_WARNING).json({
          message: 'Somthing went wrong',
          error: err
        })
      }
  
      if (unit) {
        addLog('60dff0bf708d771ce8b1c7c1', `add unit ${unit.u_name}`)
        res.status(CODE_COMPLETE).json({
          massage: 'add unit complete'
        })
      }
    })
}

exports.updateUnit = (req,res)=>{
    const {id,u_name} = req.body

    UnitModel.findByIdAndUpdate({_id:id},{u_name:u_name}).then((unit)=>{
        addLog('60dff0bf708d771ce8b1c7c1', `update unit => ${unit.u_name}`)
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
       const unit = await UnitModel.findOneAndDelete({_id:req.body.id})
        addLog('60dff0bf708d771ce8b1c7c1', `delete unit => ${unit.u_name}`)
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