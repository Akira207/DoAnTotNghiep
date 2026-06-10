import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// CREATE PAYMENT
export const createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, status } = req.body;
    // validate
    if (!orderId || !amount || !paymentMethod) {
      return badRequest(res, "Missing required fields");
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return notFound(res, "Order not found");
    }
    const payment = new Payment({
      orderId,
      amount,
      type: "income",
      paymentMethod,
      paymentDate: new Date(),
      status: status || "pending",
    });
    const saved = await payment.save();
    console.log("Payment saved successfully:", saved._id);

    // cập nhật trạng thái order nếu thanh toán đủ
    try {
      const payments = await Payment.find({ orderId: order._id });
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
      console.log(`Total paid for order ${order._id}: ${totalPaid}, Total amount: ${order.totalAmount}`);

      if (totalPaid >= order.totalAmount) {
        order.status = "pending";
        await order.save();
        console.log("Order status updated to pending (paid)");
      }
    } catch (updateErr) {
      console.error("Order status update error:", updateErr);
    }

    console.log("Sending success response for payment creation");
    return res.status(201).json({
      success: true,
      data: saved,
      message: "Payment created successfully"
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("orderId");

    const result = payments.map(p => {
      const paymentObj = p.toObject();
      // Nếu không có orderId, chúng ta có thể gắn một nhãn mô tả hoặc để trống
      if (!paymentObj.orderId) {
        paymentObj.isExpense = true; // Đánh dấu là chi phí nhập kho
      }
      return paymentObj;
    });

    return successResponse(res, result, "Payments fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET BY ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("orderId");
    if (!payment) {
      return notFound(res, "Payment not found");
    }
    return successResponse(res, payment, "Payment fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE PAYMENT
export const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return notFound(res, "Payment not found");
    }
    // update lại trạng thái order nếu cần
    const order = await Order.findById(updated.orderId);
    if (updated.amount >= order.totalAmount) {
      order.status = "pending";
    } else {
      order.status = "waiting_payment";
    }
    await order.save();
    return successResponse(res, updated, "Payment updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE PAYMENT
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return notFound(res, "Payment not found");
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
      order.status = "pending";
    } else {
      order.status = "waiting_payment";
    }
    await order.save();
    return successResponse(res, null, "Payment deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
