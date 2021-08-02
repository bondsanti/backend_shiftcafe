const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const BankModel = require('./../models/bank.model')
const formidable = require('formidable')
const fs = require('fs-extra')

const uploadImage = async (files, bank) => {
  if (files.img ) {
    //console.log("1 =>"+files)
    const fileExtention = files.img.name.split('.')[1]
    //const fileExtention2 = files.img_cover.name.split('.')[1]
    bank.img = `${bank._id}.${fileExtention}`
    //bank.img_cover = `${bank._id}-cover.${fileExtention2}`
    const newPath = './upload/' + bank.img
   // const newPath2 = './upload/' + bank.img_cover

    if (fs.exists(newPath)) {
      await fs.remove(newPath)
    }

    // if (fs.exists(newPath2)) {
    //   await fs.remove(newPath2)
    // }

    await fs.moveSync(files.img.path, newPath)
    //await fs.moveSync(files.img_cover.path, newPath2)
    const result = await BankModel.findByIdAndUpdate(
      { _id: bank._id },
      { img: bank.img }
    )
    // return result
  } 

  if(files.img_cover){
    //console.log("4 =>"+files)
    //const fileExtention = files.img.name.split('.')[1]
    const fileExtention2 = files.img_cover.name.split('.')[1]
    //bank.img = `${bank._id}.${fileExtention}`
    bank.img_cover = `${bank._id}-cover.${fileExtention2}`
    //const newPath = './upload/' + bank.img
    const newPath2 = './upload/' + bank.img_cover

    // if (fs.exists(newPath)) {
    //   await fs.remove(newPath)
    // }

    if (fs.exists(newPath2)) {
      await fs.remove(newPath2)
    }

    //await fs.moveSync(files.img.path, newPath)
    await fs.moveSync(files.img_cover.path, newPath2)
    const result = await BankModel.findByIdAndUpdate(
      { _id: bank._id },
      {  img_cover: bank.img_cover }
    )
  }
  return bank
}

exports.addBank = (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      let bank = await BankModel.create(fields)
      bank = await uploadImage(files, bank)
      await addLog(req.user._id, `add new bank -> ${bank.bank_name}`)
      res.status(CODE_COMPLETE).json({
        message: 'add bank complete'
      })
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'add bank uncomplete',
      error: e
    })
  }
}

exports.updateBank = (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
       //console.log(files)
      let bank = await BankModel.findByIdAndUpdate(
        { _id: req.params.id },
        fields
      )
      bank = await uploadImage(files, bank)

      await addLog(req.user._id, `update bank -> ${bank.bank_name}`)
      res.status(CODE_COMPLETE).json({
        message: 'update bank complete'
      })
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'update bank uncomplete',
      error: e
    })
  }
}

exports.deleteBank = (req, res) => {
  BankModel.findByIdAndDelete({ _id: req.params.id })
    .then(async bank => {
      if (fs.exists('./upload/' + bank.img)) {
        await fs.remove('./upload/' + bank.img)
      }
      if (fs.exists('./upload/' + bank.img_cover)) {
        await fs.remove('./upload/' + bank.img_cover)
      }
      await addLog(req.user._id, `delete bank id -> ${bank._id}`)
      res.status(CODE_COMPLETE).json({
        message: 'delete bank complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'delete bank uncomplete',
        error: e
      })
    })
}

exports.allBank = (req, res) => {
  BankModel.find().then(bank => {
    res.status(CODE_COMPLETE).json(bank)
  })
}
