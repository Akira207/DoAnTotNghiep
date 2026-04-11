import Payment from "../models/Payment.js";
import Order from "../models/Order.js";

// CREATE PAYMENT
export const createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, status } = req.body;
    // validate
    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const payment = new Payment({
      orderId,
      amount,
      paymentMethod,
      paymentDate: new Date(),
      status: status || "pending",
    });
    const saved = await payment.save();
    // nếu thanh toán đủ → update order
    if (amount >= order.totalAmount) {
      order.status = "paid";
      await order.save();
    }
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("orderId");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("orderId");
    if (!payment) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PAYMENT
export const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }
    // update lại trạng thái order nếu cần
    const order = await Order.findById(updated.orderId);
    if (updated.amount >= order.totalAmount) {
      order.status = "paid";
    } else {
      order.status = "created";
    }
    await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PAYMENT
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Not found" });
    }
    await Payment.findByIdAndDelete(req.params.id);
    // cập nhật lại order
    const order = await Order.findById(payment.orderId);
    const payments = await Payment.find({ orderId: order._id });
    let totalPaid = 0;
    for (let p of payments) {
      totalPaid += p.amount;
    }
    if (totalPaid >= order.totalAmount) {
      order.status = "paid";
    } else {
      order.status = "created";
    }
    await order.save();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
