const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING ,CODE_ERROR} = require('../instant')
const CategoryModel = require('./../models/category.model')
const formidable = require('formidable')
const fs = require('fs-extra')

const uploadImage = async (files, cate) => {
    if (files.img != null) {
      const fileExtention = files.img.name.split('.')[1]
      cate.img = `${cate._id}.${fileExtention}`
      const newPath = './upload/' + cate.img
  
      if (fs.exists(newPath)) {
        await fs.remove(newPath)
      }
  
      await fs.moveSync(files.img.path, newPath)
      const result = await CategoryModel.findByIdAndUpdate(
        { _id: cate._id },
        { img: cate.img }
      )
      return result
    }
    return cate
  }

exports.addCategory = (req,res)=>{
      try {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
          //console.log(fields)
          let cate = await CategoryModel.create(fields)
          cate = await uploadImage(files, cate)
          await addLog(req.user._id, `add category ${cate.cate_name}`)
          res.status(CODE_COMPLETE).json({
            message: 'เพิ่มหมวดหมู่เสร็จสมบูรณ์'
          })
        })
      } catch (e) {
        res.status(CODE_WARNING).json({
          message: 'เพิ่มหมวดหมู่ที่ไม่สมบูรณ์',
          error: e
        })
      }
}

exports.updateCategory = (req,res)=>{
    try {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
          let cate = await CategoryModel.findByIdAndUpdate(
            { _id: req.params.id },
            fields
          )
          cate = await uploadImage(files, cate)
          await addLog(req.user._id, `update category -> ${cate.cate_name}`)
          res.status(CODE_COMPLETE).json({
            message: 'อัพเดทหมวดหมู่เสร็จสมบูรณ์'
          })
        })
      } catch (e) {
        res.status(CODE_WARNING).json({
          message: 'อัพเดทหมวดหมู่ไม่สมบูรณ์',
          error: e
        })
      }
}

exports.deleteCategory = (req,res)=>{
    CategoryModel.findByIdAndDelete({_id:req.params.id}).then(async(cate)=>{
       await addLog('60dff0bf708d771ce8b1c7c1', `delete category => ${cate.cate_name}`)
          res.status(CODE_COMPLETE).json({
              message:"ลบหมวดหมู่เสร็จสมบูรณ์"
          })
    }).catch((e)=>{
        res.status(CODE_WARNING).json({
            message:"ลบหมวดหมู่ไม่สมบูรณ์"
        })
    })
}

exports.allCategory = (req,res)=>{
    CategoryModel.find().populate('products','product_name').then(cate=>{
        res.status(CODE_COMPLETE).json(cate)
    })
}

exports.toppingCategory = (req,res)=>{
  CategoryModel.findByIdAndUpdate({_id:req.params.id},{
    topping:req.body.topping
  }).then(()=>{
    res.status(CODE_COMPLETE).json({
      message: 'บันทึก ท็อปปิ้ง สำเร็จ'
    })
  }).catch((e)=>{
    res.status(CODE_WARNING).json({
      message: 'บันทึก ท็อปปิ้ง ไม่สำเร็จ',
      error: e
    })
  })
}