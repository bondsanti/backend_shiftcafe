const LogModel = require('./../models/log_action.model')
exports.addLog = (emp_id,activity)=>{
    const newLog = new LogModel({
        emp_id: emp_id,
        activity: activity
      })
      newLog.save()
}