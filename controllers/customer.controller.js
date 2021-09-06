const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const customerModel = require('./../models/customer.model')
const PaymentModel = require('./../models/payment.model')
const LevelMemberModel = require('./../models/levelMember.model')

exports.addCustomer = async (req, res) => {
  const today = new Date()
  const checkTel = await customerModel.find({tel:req.body.tel})
  if(checkTel.length === 0){

    customerModel
      .create({
        pname: req.body.pname,
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        tel: req.body.tel,
        password: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        ref_level_id: req.body.ref_level_id,
        point: req.body.point,
        member_no:`${today.getFullYear()+543}${(today.getMonth()+1) < 10 ? '0'+today.getMonth()+1 : today.getMonth()+1 }${today.getDate() < 10 ? '0'+today.getDate() : today.getDate() }${Math.floor(Math.random() * (9999 - 1000) + 1000)}`
      })
      .then(async cus => {
        await addLog(req.user._id, `add customer => ${cus.fname}`)
        res.status(CODE_COMPLETE).json({
          message: 'เพิ่มลูกค้าเสร็จสมบูรณ์'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'เพิ่มลูกค้าไม่สมบูรณ์',
          error: e
        })
      })
  }else{
    res.status(CODE_WARNING).json({
      message: 'เพิ่มลูกค้าไม่สมบูรณ์ มีเบอร์โทรศัพท์นี้อยู่ในระบบแล้ว',
     
    })
  }
}

exports.updateCustomer = (req, res) => {
  customerModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        pname: req.body.pname,
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        tel: req.body.tel,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        ref_level_id: req.body.ref_level_id,
        point: req.body.point
      }
    )
    .then(async cus => {
      await addLog(req.user._id, `update customer => ${cus.fname}`)
      res.status(CODE_COMPLETE).json({
        message: 'อัพเดตลูกค้าเสร็จสมบูรณ์'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'อัพเดตลูกค้าไม่สมบูรณ์',
        error: e
      })
    })
}

exports.deleteCustomer = (req, res) => {
  customerModel
    .findByIdAndDelete({ _id: req.params.id })
    .then(async cus => {
      await addLog(req.user._id, `delete customer => ${cus.fname}`)
      res.status(CODE_COMPLETE).json({
        message: 'ลบลูกค้าเสร็จสมบูรณ์'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'ลบลูกค้าไม่สมบูรณ์',
        error: e
      })
    })
}

exports.allCustomer = async (req, res) => {
  const cus = await customerModel.find().populate('ref_level_id')

  const newCus = cus.filter(c => c.pname !== 'guest')
  res.status(CODE_COMPLETE).json(newCus)
}

exports.allCustomer2 = (req, res) => {
  customerModel
    .find()
    .populate('ref_level_id')
    .then(cus => {
      res.status(CODE_COMPLETE).json(cus)
    })
}

exports.getCustomerById = (req, res) => {
  customerModel
    .findById({ _id: req.params.id })
    .populate('ref_level_id')
    .then(cus => {
      res.status(CODE_COMPLETE).json(cus)
    })
}

exports.getCustomerByTel = (req, res) => {
  customerModel
    .find({ tel: req.params.id })
    .then(cus => {
      res.status(CODE_COMPLETE).json(cus)
    })
}

exports.checkAndUpdateLevelMember = async(req,res)=>{
  //console.log(req.params.id);
  if(req.params.id){
    const custom = await checkPayment(req.params.id)
     res.status(CODE_COMPLETE).json({message:"เช็คการปรับระดับสมาชิกสำเร็จ"})
  }else{
    res.status(CODE_ERROR).json({message:"ไม่พบรหัสของลูกค้า"})
  }
 
}

const updateMission = async (id) =>{
  const cus = await customerModel.findById({_id:id}).populate('ref_level_id')
  const today = new Date()
  const missionEnd = new Date(cus.mission.end)
  if(today.getTime() > missionEnd.getTime()){
    customerModel.findByIdAndUpdate({_id:cus._id},{
      mission:{
        start:new Date(today.getFullYear(),missionEnd.getMonth(),missionEnd.getDate()),
        end:new Date(today.getFullYear()+1,missionEnd.getMonth(),missionEnd.getDate())
      }
    }).then((cus2)=>{
      return cus2
    })
  }else{
    return cus
  }
}

const checkPayment = async(id)=>{
  const pay = await PaymentModel.find({ref_cus_id:id})
  const cus = await updateMission(id)
  const level = await LevelMemberModel.find()
  // const today = new Date()
  // const cusDate = new Date(cus.datetime)
  const startDate = new Date(cus.mission.start)
  const endDate = new Date(cus.mission.end)

  if(cus.fname !== 'guest' && cus.lname !== 'guest'){

    const pay_in_start_and_end = pay.filter(p=>{
      return (
        new Date(p.datetime).getTime() >= startDate.getTime() &&
        new Date(p.datetime).getTime() <= endDate.getTime()
      )
    })
  
  
    let net_price = 0
    pay_in_start_and_end.map(p=> net_price += p.net_price)

    //เรียง target_price จากมากไปน้อย
  level.sort((a,b)=> b.target_price - a.target_price)
  const result = level.find(l=> net_price > l.target_price)
  // console.log(net_price)
  // console.log(result)
  customerModel.findByIdAndUpdate({_id:cus._id},{ref_level_id:result?result._id:null}).then((cus_here)=>{
    return cus_here
  })
  }else{

    return cus
  }

}

exports.checkAndUpdateLevelMember2 = async(id)=>{
 
  const cus = await checkPayment(id)
  return cus
 
}
