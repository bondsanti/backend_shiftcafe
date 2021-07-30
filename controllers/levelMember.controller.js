const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const LevelMemberModel = require('./../models/levelMember.model')
const formidable = require('formidable')
const fs = require('fs-extra')

const uploadImage = async (files, level) => {
  if (files.img != null) {
    const fileExtention = files.img.name.split('.')[1]
    level.img = `${level._id}.${fileExtention}`
    const newPath = './upload/' + level.img

    if (fs.exists(newPath)) {
      await fs.remove(newPath)
    }

    await fs.moveSync(files.img.path, newPath)
    const result = await LevelMemberModel.findByIdAndUpdate(
      { _id: level._id },
      { img: level.img }
    )
    return result
  }
  return level
}

exports.addLevelMember = (req, res) => {
  
    try {
      const form = new formidable.IncomingForm()
      form.parse(req, async (err, fields, files) => {
        //console.log(fields)
        let level = await LevelMemberModel.create({...fields,datetime:Date.now()})
        level = await uploadImage(files, level)
        await addLog(req.user._id, `add level member -> ${level.level_name}`)
        res.status(CODE_COMPLETE).json({
          message: 'add level member complete'
        })
      })
    } catch (e) {
      res.status(CODE_WARNING).json({
        message: 'add level member uncomplete',
        error: e
      })
    }
}

exports.updateLevelMember = (req, res) => {
  try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      let level = await LevelMemberModel.findByIdAndUpdate(
        { _id: req.params.id },
        {...fields,datetime:Date.now()}
      )
      level = await uploadImage(files, level)
      await addLog(req.user._id, `update level member -> ${level.level_name}`)
      res.status(CODE_COMPLETE).json({
        message: 'update level member complete'
      })
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'update level member uncomplete',
      error: e
    })
  }
}

exports.deleteLevelMember = (req, res) => {
  if (req.params.id) {
    LevelMemberModel.findByIdAndDelete({ _id: req.params.id })
      .then(level => {
        addLog(req.user._id, `delete level member => ${level.level_name}`)
        res.status(CODE_COMPLETE).json({
          message: 'delete level member complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'delete level member uncomplete',
          error: e
        })
      })
  }else{
    res.status(CODE_WARNING).json({
        message: 'id is undefind'
      }) 
  }
}

exports.allLevelMember = (req,res)=>{
  LevelMemberModel.find().then(level=>{
    res.status(CODE_COMPLETE).json(level)
  })
}
