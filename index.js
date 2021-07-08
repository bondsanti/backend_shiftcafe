const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const mongoClient = require('mongodb').MongoClient
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()

const Connect = async () => {
  let url = process.env.DB_URL_PRODUCTION

  try {
    let client = await mongoose.connect(url, {
      poolSize: 10,
      authSource: 'admin',
      user: 'admin',
      pass: 'CNZgoa47421',
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    console.log('Database is connected!')
  } catch (error) {
    console.log(error.stack)
    process.exit(1)
  }
}
Connect()

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
const pointPaymentRoute = require('./routes/pointPayment.route')
const bankRoute = require('./routes/bank.route')

app.get('/', (req, res) => {
  res.send('BACKEND SHIFT CAFE')
})

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
app.use('/api', pointPaymentRoute)
app.use('/api',bankRoute)

app.listen(process.env.PORT, process.env.IP_ADDRESS, () => {
  console.log(
    `server is running on IP ${process.env.IP_ADDRESS} and PORT ${process.env.PORT}`
  )
})
