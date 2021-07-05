const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const mongoClient = require('mongodb').MongoClient
const cors = require("cors")
const path = require("path")
const app = express()

// mongoose.connect(
//   process.env.DB_URL,
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

// mongoose.createConnection(
//   //"mongodb://localhost:27017/dbName",
//   "mongodb://node15454-shift.th.app.ruk-com.cloud:27017/shift_cafe",
//   {
//     "auth": {
//       "authSource": "admin"
//     },
//     "user": "admin",
//     "pass": "ZIPhir37741"
    
//   }
// );

const Connect = async () => {

  let url = "mongodb://node15454-shift.th.app.ruk-com.cloud:27017/shift_cafe";

  try {

      let client = await mongoose.connect( url, {
          poolSize: 10,
          authSource: "admin",
          user: "admin",
          pass: "ZIPhir37741", 
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true
      } );

      console.log( "Database is connected!" );
  } catch ( error ) {
      console.log( error.stack );
      process.exit( 1 );
  }

}
Connect();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use("/public", express.static(path.join(__dirname, "uploads")))

const roleRoute = require("./routes/addRole.route")
const employeeRoute = require("./routes/employee.route")
const authenRoute = require("./routes/authen.route")

app.get('/', (req, res) => {
  res.send('Hello word')
})

app.use("/api",roleRoute)
app.use("/api",employeeRoute)
app.use("/api",authenRoute)

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`)
})
