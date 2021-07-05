const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING ,CODE_ERROR} = require('../instant')
const CategoryModel = require('./../models/category.model')

exports.addCategory = (req,res)=>{
    const newCategory = new CategoryModel({
        cate_name:req.body.cate_name
      })
      newCategory.save().then((cate)=>{
        addLog('60dff0bf708d771ce8b1c7c1', `add category ${cate.cate_name}`)
          res.status(CODE_COMPLETE).json({
              message:"add category complete"
          })
      }).catch((e)=>{
        res.status(CODE_WARNING).json({
            message:"add category uncomplete",
            error:e
        })
      })
}

exports.updateCategory = (req,res)=>{
    CategoryModel.findByIdAndUpdate({_id:req.body.id},{cate_name:req.body.cate_name}).then((cate)=>{
        addLog('60dff0bf708d771ce8b1c7c1', `update category => ${cate.cate_name}`)
          res.status(CODE_COMPLETE).json({
              message:"update category complete"
          })
    }).catch((e)=>{
        res.status(CODE_WARNING).json({
            message:"update category uncomplete",
            error:e
        }) 
    })
}

exports.deleteCategory = (req,res)=>{
    CategoryModel.findByIdAndDelete({_id:req.body.id}).then((cate)=>{
        addLog('60dff0bf708d771ce8b1c7c1', `delete category => ${cate.cate_name}`)
          res.status(CODE_COMPLETE).json({
              message:"delete category complete"
          })
    }).catch((e)=>{
        res.status(CODE_WARNING).json({
            message:"delete category uncomplete"
        })
    })
}