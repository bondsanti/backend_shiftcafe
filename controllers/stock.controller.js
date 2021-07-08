const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')
const StockModel = require('./../models/stock.model')
const ProductModel = require('./../models/product.model')

exports.addStock = async (req, res) => {
  try {
    const stock = await StockModel.create({
      ref_pro_id: req.body.ref_pro_id,
      qty_min: req.body.qty_min,
      qty_max: req.body.qty_max,
      ref_emp_id: req.user._id
    })

    const product = await ProductModel.findByIdAndUpdate(
      { _id: stock.ref_pro_id },
      { stock: stock.qty_max }
    )

    await addLog(
      req.user._id,
      `add ${stock.qty_max} stock where product id = ${product._id}`
    )

    res.status(CODE_COMPLETE).json({
      message: 'add stock complete'
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'add stock uncomplete',
      error: e
    })
  }
}

exports.updateStock = async (req, res) => {
  try {
    const stock = await StockModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        qty_min: req.body.qty_min,
        qty_max: req.body.qty_max,
        ref_emp_id: req.user._id
      }
    )

    const product = await ProductModel.findByIdAndUpdate(
      { _id: stock.ref_pro_id },
      { stock: req.body.qty_max }
    )

    await addLog(
      req.user._id,
      `update ${req.body.qty_max} stock where product id = ${product._id}`
    )

    res.status(CODE_COMPLETE).json({
      message: 'update stock complete'
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'update stock uncomplete',
      error: e
    })
  }
}

exports.deleteStock = async (req, res) => {
  try {
    const stock = await StockModel.findById({ _id: req.params.id })
    const product = await ProductModel.findByIdAndUpdate(
      { _id: stock.ref_pro_id },
      { stock: 0 }
    )

    await addLog(
      req.user._id,
      `delete ${stock.qty_max} stock where product id = ${product._id}`
    )

    await StockModel.findByIdAndDelete({ _id: stock._id })

    res.status(CODE_COMPLETE).json({
      message: 'delete stock complete'
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'delete stock uncomplete',
      error: e
    })
  }
}
