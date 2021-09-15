const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
//const path = require('path')
const cookieParser = require('cookie-parser')
const helmet = require("helmet");
// const socketio = require('socket.io')
const app = express()
const checkRoleAndEmployeeAndMember = require("./instant/check_database")
//app.use(morgan('combined'))

mongoose
  .connect(process.env.DB_URL_PRODUCTION, {
    poolSize: 10,
    authSource: 'admin',
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
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

app.use(helmet());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
// app.use(cors({
//   origin:['https://shift-cafe.com','http://192.168.1.55:3000','http://192.168.1.35:3000','http://192.168.1.15:3000']
// }))
app.use(cors())
app.use(express.static(__dirname + '/upload'))
app.use(cookieParser())


app.use('/api', require('./routes/addRole.route'))
app.use('/api', require('./routes/employee.route'))
app.use('/api', require('./routes/authen.route'))
app.use('/api', require('./routes/unit.route'))
app.use('/api', require('./routes/category.route'))
app.use('/api', require('./routes/levelMember.route'))
app.use('/api', require('./routes/product.route'))
app.use('/api', require('./routes/customer.route'))
app.use('/api', require('./routes/pointManage.route'))
app.use('/api', require('./routes/coupon.route'))
app.use('/api', require('./routes/withdraw.route'))
app.use('/api', require('./routes/stock.route'))
app.use('/api', require('./routes/order.route'))
app.use('/api', require('./routes/payment.route'))
//app.use('/api', pointPaymentRoute)
app.use('/api', require('./routes/bank.route'))
app.use('/api', require('./routes/setting.route'))
app.get('*', (req, res) => {
  res.render('index')
})


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
