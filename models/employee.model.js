const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ref_id_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  idcard:{
      type:String,
      required:true
  },
  pname:{
    type: String,
    required: true
  },
  fname:{
    type: String,
    required: true
  },
  lname:{
    type: String,
    required: true
  },
  birthday:{
    type: Date,
    required: true
  },
  tel:{
      type:String,
      require:true
  },
  email:{
    type: String,
    required: true 
  },
  address:{
    type: String,
    required: true 
  }
})

// employeeSchema.virtual("password").set(function (password) {
//     this.password = bcrypt.hashSync(password, 10);
//   });

employeeSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.password);
  },
};

module.exports = mongoose.model("Employee",employeeSchema)
