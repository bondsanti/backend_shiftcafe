const bcrypt = require('bcrypt')
const RoleModel = require('./../models/role.model')
const EmployeeModel = require('./../models/employee.model')
const CustomerModel = require('./../models/customer.model')
const SettingModel = require('./../models/setting.model')

const position = ['manager', 'cashier', 'staff', 'checker']

const checkRoleAndEmployeeAndMember = async () => {
  try {
    const role = await RoleModel.find()
    if (role.length === 0) {
      await RoleModel.create({ position: 'admin' })
      position.map(async p => {
        await RoleModel.create({ position: p })
      })
      console.log('create 5 roles complete')
      const role2 = await RoleModel.find({ position: 'admin' })
      const emp = await EmployeeModel.find()
      if (emp.length === 0) {
        await EmployeeModel.create({
          username: 'admin',
          password: await bcrypt.hash('123456', 10),
          ref_id_role: role2[0]._id,
          idcard: '1234567890123',
          pname: 'admin',
          fname: 'admin',
          lname: 'admin',
          birthday: Date.now(),
          tel: '1234567890',
          email: 'admin@admin.com',
          address: 'admin address'
        })
        console.log('create employee username:admin and password:123456')
      }
    } else {
      const role2 = await RoleModel.find({ position: 'admin' })
      const emp = await EmployeeModel.find()
      if (emp.length === 0) {
        await EmployeeModel.create({
          username: 'admin',
          password: await bcrypt.hash('123456', 10),
          ref_id_role: role2[0]._id,
          idcard: '1234567890123',
          pname: 'admin',
          fname: 'admin',
          lname: 'admin',
          birthday: Date.now(),
          tel: '1234567890',
          email: 'admin@admin.com',
          address: 'admin address'
        })
        console.log('create employee username:admin and password:123456')
      }
    }
  } catch (e) {
    console.log(e)
  }

  CustomerModel.find().then(cus => {
    if (cus.length === 0) {
      const today = new Date()
      CustomerModel.create({
        pname: 'guest',
        fname: 'guest',
        lname: 'guest',
        birthday: today,
        tel: 'guest',
        password: 'guest',
        email: 'guest',
        address: 'guest',
        member_no: `${today.getFullYear() + 543}${
          today.getMonth() + 1 < 10
            ? '0' + today.getMonth() + 1
            : today.getMonth() + 1
        }${
          today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
        }${Math.floor(Math.random() * (9999 - 1000) + 1000)}`
      })
      console.log('create customer complete')
    }
  })

  SettingModel.find().then(async(set)=>{
    if(set.length === 0){
     const newSet = new SettingModel()
     newSet.save()
      console.log('create default setting complete')
    }
  })
}

module.exports = checkRoleAndEmployeeAndMember