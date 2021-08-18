const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const productModel = require('./../models/product.model')
const formidable = require('formidable')
const fs = require('fs-extra')

//const path = require('path')

const uploadImage = async (files, product) => {
  if (files.img != null) {
    const fileExtention = files.img.name.split('.')[1]
    product.img = `${product._id}.${fileExtention}`
    const newPath = './upload/' + product.img

    if (fs.exists(newPath)) {
      await fs.remove(newPath)
    }

    await fs.moveSync(files.img.path, newPath)
    const result = await productModel.findByIdAndUpdate(
      { _id: product._id },
      { img: product.img }
    )
    return result
  }
  return product
}

exports.addProduct = (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      let product = await productModel.create(fields)
      product = await uploadImage(files, product)
      await addLog(req.user._id, `add product => ${product.product_name}`)
      res.status(CODE_COMPLETE).json({
        message: 'เพิ่มสิ้นค้าเสร็จสมบูรณ์'
      })
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'เพิ่มสิ้นค้าไม่สมบูรณ์',
      error: e
    })
  }
}

exports.updateProduct = (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      //console.log(fields)
      let product = await productModel.findOneAndUpdate(
        { _id: req.params.id },
        fields
      )
      product = await uploadImage(files, product)
      await addLog(req.user._id, `update product => ${product.product_name}`)
      res.status(CODE_COMPLETE).json({
        message: 'อัพเดตสิ้นค้าเสร็จสมบูรณ์'
      })
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'อัพเดตสิ้นค้าไม่สมบูรณ์',
      error: e
    })
  }
}

exports.toppingProduct = (req,res)=>{
  productModel.findByIdAndUpdate({_id:req.params.id},{
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

exports.updateProduct2 = async (req, res) => {
  try {
    await productModel.findOneAndUpdate(
      { _id: req.params.id },
      { status: req.body.status }
    )
    res.status(CODE_COMPLETE).json({
      message: 'อัพเดตสิ้นค้าเสร็จสมบูรณ์'
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'อัพเดตสิ้นค้าไม่สมบูรณ์',
      error: e
    })
  }
}

exports.deleteProduct = (req, res) => {
  productModel
    .findByIdAndDelete({ _id: req.params.id })
    .then(async product => {
      if (fs.exists('./upload/' + product.img)) {
        await fs.remove('./upload/' + product.img)
      }
      await addLog(req.user._id, `delete product => ${product.product_name}`)
      res.status(CODE_COMPLETE).json({
        message: 'ลบสิ้นค้าเสร็จสมบูรณ์'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'ลบสิ้นค้าไม่สมบูรณ์',
        error: e
      })
    })
}

exports.allProduct = (req, res) => {
  productModel
    .find()
    .populate('ref_uid')
    .populate('ref_cate_id')
    .then(product => {
      res.status(CODE_COMPLETE).json(product)
    })
}

exports.showProduct = (req, res) => {
  productModel
    .find({ status: true })
    .populate('ref_uid')
    .populate('ref_cate_id')
    .then(product => {
      res.status(CODE_COMPLETE).json(product)
    })
}

