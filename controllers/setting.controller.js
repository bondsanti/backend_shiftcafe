const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')
const SettingModel = require('./../models/setting.model')
const formidable = require('formidable')
const fs = require('fs-extra')

const uploadImage = async (files, setting) => {
    if (files.logo != null) {
      const fileExtention = files.logo.name.split('.')[1]
      setting.logo = `logo.${fileExtention}`
      const newPath = './upload/' + setting.logo
  
      if (fs.exists(newPath)) {
        await fs.remove(newPath)
      }
  
      await fs.moveSync(files.logo.path, newPath)
      const result = await SettingModel.findByIdAndUpdate(
        { _id: setting._id },
        { logo: setting.logo }
      )
      return result
    }
    return setting
  }

exports.addSetting = (req,res)=>{
    try {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
          //console.log(fields)
          let setting = await SettingModel.create(fields)
          setting = await uploadImage(files, setting)
          await addLog(req.user._id, `add setting -> ${setting.head_title}`)
          res.status(CODE_COMPLETE).json({
            message: 'เพิ่มการตั้งค่าสำเร็จ'
          })
        })
      } catch (e) {
        res.status(CODE_WARNING).json({
          message: 'เพิ่มการตั้งค่าที่ไม่สำเร็จ',
          error: e
        })
      }
}

exports.updateSetting = (req,res)=>{
    try {
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
          //console.log(fields)
          let setting = await SettingModel.findByIdAndUpdate({_id:req.params.id},fields)
          setting = await uploadImage(files, setting)
          await addLog(req.user._id, `update setting -> ${setting.head_title}`)
          res.status(CODE_COMPLETE).json({
            message: 'อัปเดตการตั้งค่าสำเร็จ'
          })
        })
      } catch (e) {
        res.status(CODE_WARNING).json({
          message: 'อัปเดตการตั้งค่าไม่สำเร็จ',
          error: e
        })
      }
}

exports.allSetting = (req,res)=>{
    SettingModel.find().then((set)=>{
        res.status(CODE_COMPLETE).json(set) 
    }).catch(e=>{
        res.status(CODE_WARNING).json({
            error: e
          })
    })
}