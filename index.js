const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require("cors")
const path = require("path")
const app = express()

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => console.log('connected database')
)

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
