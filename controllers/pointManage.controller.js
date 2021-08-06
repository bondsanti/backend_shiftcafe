const { addLog } = require("./addLog.controller");
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require("../instant");
const pointManageModel = require("./../models/pointManage.model");
const customerModel = require("./../models/customer.model");
const CouponModel = require("./../models/coupon.model")

exports.addPointManage = async (req, res) => {
  if (req.body.status === "plus") {
    const cus = await customerModel.findById({ _id: req.body.ref_cus_id });
    const newPoint = cus.point + parseInt(req.body.point);
    try {
      await customerModel.findOneAndUpdate(
        { _id: cus._id },
        { point: newPoint }
      );
      const pointManage = await pointManageModel.create({
        ref_cus_id: req.body.ref_cus_id,
        ref_emp_id: req.user._id,
        point: req.body.point,
        status: req.body.status,
        point_by: "system",
      });
      addLog(
        req.user._id,
        `${pointManage.status} ${pointManage.point} point where customer id = ${pointManage.ref_cus_id} || point by SYSTEM`
      );
      res.status(CODE_COMPLETE).json({
        message: `plus ${pointManage.point} point complete`,
      });
    } catch (e) {
      res.status(CODE_WARNING).json({
        message: `plus ${pointManage.point} point uncomplete`,
        error: e,
      });
    }
  } else {
    const cus = await customerModel.findById({ _id: req.body.ref_cus_id });
    if (cus.point >= parseInt(req.body.point)) {
      const newPoint = cus.point - parseInt(req.body.point);
      try {
        await customerModel.findOneAndUpdate(
          { _id: cus._id },
          { point: newPoint }
        );
        const pointManage = await pointManageModel.create({
          ref_cus_id: req.body.ref_cus_id,
          ref_emp_id: req.user._id,
          point: req.body.point,
          status: req.body.status,
          point_by: "system",
        });
        addLog(
          req.user._id,
          `${req.body.status} ${req.body.point} point where customer id = ${req.body.ref_cus_id} || point by SYSTEM`
        );
        res.status(CODE_COMPLETE).json({
          message: `minus ${req.body.point} point complete`,
        });
      } catch (e) {
        res.status(CODE_WARNING).json({
          message: `minus ${req.body.point} point uncomplete`,
          error: e,
        });
      }
    } else {
      res.status(CODE_WARNING).json({
        message: `your point not enough to minus `,
      });
    }
  }
};

exports.allPointManage = (req, res) => {
  pointManageModel.find().populate('ref_emp_id','fname lname pname').populate("ref_cus_id",'pname fname lname').then((point) => {
    res.status(CODE_COMPLETE).json(point);
  });
};

exports.allPointManageByCustomerId = (req, res) => {
  pointManageModel.find({ref_cus_id:req.params.id}).then((point) => {
    res.status(CODE_COMPLETE).json(point);
  });
};

exports.addPointByPayment = async (cus_id, new_point, emp_id,coupon_id) => {
  if(coupon_id !== null){
   CouponModel.findById({_id:coupon_id}).then(async(c)=>{
    if(c.num_use !== 0){
      const new_num_use = c.num_use - 1
      await CouponModel.findByIdAndUpdate({_id:coupon_id},{num_use:new_num_use})
    }
   })
  }
  const cus = await customerModel.findById({ _id: cus_id });
  const newPoint = cus.point + parseInt(new_point);
  await customerModel.findOneAndUpdate({ _id: cus._id }, { point: newPoint });
  const pointManage = await pointManageModel.create({
    ref_cus_id: cus_id,
    ref_emp_id: emp_id,
    point: new_point,
    status: "plus",
    point_by: "buy",
  });
  addLog(
    emp_id,
    `plus ${pointManage.point} point where customer id = ${pointManage.ref_cus_id} || point by BUY`
  );
  return true
};
