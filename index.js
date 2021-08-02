const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
//const mongoClient = require('mongodb').MongoClient
const cors = require('cors')
//const path = require('path')
const cookieParser = require('cookie-parser')
// const socketio = require('socket.io')
const app = express()
//app.use(morgan('combined'))
// const ProductModel = require("./models/product.model")



mongoose.connect(process.env.DB_URL_PRODUCTION,{
  poolSize: 10,
  authSource: 'admin',
  user: 'admin',
  pass: 'CNZgoa47421',
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=>{
  console.log('Database is connected!')
}).catch((e)=>{
  console.log(e.stack)
  process.exit(1)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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
app.use('/api',bankRoute)
app.use('/api',settingRoute)
app.get('*', (req, res) => {
  res.send("<h1>BACKEND SHIFT CAFE</h1>")
})

 const server = app.listen(process.env.PORT, process.env.IP_ADDRESS, (error) => {
  if (error) throw error;
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
