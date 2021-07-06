const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const mongoClient = require('mongodb').MongoClient
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()

// mongoose.connect(
//   process.env.DB_URL_DEVELOPMENT,
//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   },
//   (err,db) => {
//     if(err){
//       console.log(err)
//       db.close()
//     }
//     console.log("connected database")
//   }
// )

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
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use(cookieParser())

const roleRoute = require('./routes/addRole.route')
const employeeRoute = require('./routes/employee.route')
const authenRoute = require('./routes/authen.route')
const unitRoute = require('./routes/unit.route')
const categoryRoute = require('./routes/category.route')

app.get('/', (req, res) => {
  res.send('BACKEND SHIFT CAFE')
})

app.use('/api', roleRoute)
app.use('/api', employeeRoute)
app.use('/api', authenRoute)
app.use('/api', unitRoute)
app.use('/api', categoryRoute)

app.listen(process.env.PORT, process.env.IP_ADDRESS, () => {
  console.log(
    `server is running on IP ${process.env.IP_ADDRESS} and PORT ${process.env.PORT}`
  )
})
