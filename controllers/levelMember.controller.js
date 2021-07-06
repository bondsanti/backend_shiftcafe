const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const LevelMemberModel = require('./../models/levelMember.model')

exports.addLevelMember = (req, res) => {
  const newLevel = new LevelMemberModel({
    level_name: req.body.level_name,
    discount: req.body.discount
  })

  newLevel
    .save()
    .then(level => {
      addLog(req.user._id, `add level member => ${level.level_name}`)
      res.status(CODE_COMPLETE).json({
        message: 'add level member complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'add level member uncomplete',
        error: e
      })
    })
}

exports.updateLevelMember = (req, res) => {
  if (req.params.id) {
    LevelMemberModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        level_name: req.body.level_name,
        discount: req.body.discount
      }
    )
      .then(level => {
        addLog(req.user._id, `update level member => ${level.level_name}`)
        res.status(CODE_COMPLETE).json({
          message: 'update level member complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'update level member uncomplete',
          error: e
        })
      })
  } else {
    res.status(CODE_WARNING).json({
      message: 'id is undefind'
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
