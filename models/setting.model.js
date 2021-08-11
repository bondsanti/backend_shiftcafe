const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  head_title: { type: String, default: 'DEV FONG' },
  sub_title: {
    type: String,
    default: 'DEV FONG Co., Ltd.2021'
  },
  restaurant: {
    type: String,
    default: 'บริษัท ซิฟท์ เรสเตอรองต์ จำกัด'
  },
  logo: {type:String,default:'logo.ico'},
  address: {
    type: String,
    default: '89/1 ถนนสุขสวัสดิ์ 4 ตำบลพระบาท อำเภอเมือง จังหวัดลำปาง 52000'
  },
  tel: {
    type: String,
    default: '0917961816'
  },
  point: {
    type: Number,
    default: 5
  },
  price_buy: {
    type: Number,
    default: 100
  },
  footer: {
    type: String,
    default: 'DEV FONG Co., Ltd.2021'
  }
})

module.exports = mongoose.model('Setting', settingSchema)
