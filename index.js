const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const bcrypt = require('bcrypt')
//const path = require('path')
const cookieParser = require('cookie-parser')
// const socketio = require('socket.io')
const app = express()
//app.use(morgan('combined'))
const RoleModel = require('./models/role.model')
const EmployeeModel = require('./models/employee.model')
const CustomerModel = require('./models/customer.model')
const SettingModel = require('./models/setting.model')

mongoose
  .connect(process.env.DB_URL_PRODUCTION, {
    poolSize: 10,
    authSource: 'admin',
    user: 'admin',
    pass: 'CNZgoa47421',
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Database is connected!')
  })
  .catch(e => {
    console.log(e.stack)
    process.exit(1)
  })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
// app.use(cors({
//   origin:['https://shift-cafe.com','http://192.168.1.55:3000','http://192.168.1.35:3000','http://192.168.1.15:3000']
// }))
app.use(cors())
app.use(express.static(__dirname + '/upload'))
app.use(cookieParser())

const roleRoute = require('./routes/addRole.route')
const employeeRoute = require('./routes/employee.route')
const authenRoute = require('./routes/authen.route')
const unitRoute = require('./routes/unit.route')
const categoryRoute = require('./routes/category.route')
const levelMemberRoute = require('./routes/levelMember.route')
const productRoute = require('./routes/product.route')
const customerRoute = require('./routes/customer.route')
const pointManageRoute = require('./routes/pointManage.route')
const couponRoute = require('./routes/coupon.route')
const withdrawRoute = require('./routes/withdraw.route')
const stockRoute = require('./routes/stock.route')
const orderRoute = require('./routes/order.route')
const paymentRoute = require('./routes/payment.route')
//const pointPaymentRoute = require('./routes/pointPayment.route')
const bankRoute = require('./routes/bank.route')
const settingRoute = require('./routes/setting.route')


app.use('/api', roleRoute)
app.use('/api', employeeRoute)
app.use('/api', authenRoute)
app.use('/api', unitRoute)
app.use('/api', categoryRoute)
app.use('/api', levelMemberRoute)
app.use('/api', productRoute)
app.use('/api', customerRoute)
app.use('/api', pointManageRoute)
app.use('/api', couponRoute)
app.use('/api', withdrawRoute)
app.use('/api', stockRoute)
app.use('/api', orderRoute)
app.use('/api', paymentRoute)
//app.use('/api', pointPaymentRoute)
app.use('/api', bankRoute)
app.use('/api', settingRoute)
app.get('*', (req, res) => {
  res.render('index')
})

//check data in role collections
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
checkRoleAndEmployeeAndMember()

//check data in employees

const server = app.listen(process.env.PORT, process.env.IP_ADDRESS, error => {
  if (error) throw error
  console.log(
    `server is running on IP ${process.env.IP_ADDRESS} and PORT ${process.env.PORT}`
  )
})

// const io = socketio(server)

// io.on('connection',(socket)=>{
//   console.log("client")
//   ProductModel.find().then((res)=>{
//     socket.emit('output-messages', res)
//   })
// })
