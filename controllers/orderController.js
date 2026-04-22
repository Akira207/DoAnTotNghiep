import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import ProductionTask from "../models/ProductionTask.js";
import Payment from "../models/Payment.js";
import Customer from "../models/Customer.js";

import { generateOrderCode } from "../utils/generateOrderCode.js";

/* =========================
   CREATE FULL ORDER
========================= */
export const createFullOrder = async (req, res) => {
  try {
    const { customerId, products, payment, note } = req.body;

    if (!customerId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Missing required data",
      });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const orderCode = await generateOrderCode();

    const order = await new Order({
      orderCode,
      customerId,
      orderDate: new Date(),
      status: "pending",
      note: note || "",
      totalAmount: 0,
    }).save();

    let totalAmount = 0;

    for (const item of products) {
      if (!item.productId || item.quantity == null || item.price == null) {
        await Order.findByIdAndDelete(order._id);

        return res.status(400).json({
          message: "Invalid product data",
        });
      }

      const detail = await new OrderDetail({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }).save();

      totalAmount += item.quantity * item.price;

      if (item.source === "production") {
        await new ProductionTask({
          type: "order",
          orderId: order._id,
          orderDetailId: detail._id,
          productId: item.productId, // ✅ FIX QUAN TRỌNG
          quantity: item.quantity, // ✅ FIX QUAN TRỌNG
          batch: 1,
          status: "pending",
        }).save();
      }
    }

    order.totalAmount = totalAmount;
    await order.save();

    let savedPayment = null;

    if (payment?.amount > 0) {
      savedPayment = await new Payment({
        orderId: order._id,
        amount: payment.amount,
        paymentDate: new Date(),
        paymentMethod: payment.method || "cash",
        status: "completed",
      }).save();
    }

    return res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      orderCode,
      totalAmount,
      payment: savedPayment,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

/* =========================
   GET ALL ORDERS
========================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ORDER BY ID
========================= */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customerId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const details = await OrderDetail.find({
      orderId: order._id,
    }).populate("productId");

    const payment = await Payment.findOne({
      orderId: order._id,
    });

    return res.json({
      order,
      details,
      payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   UPDATE ORDER STATUS (FIXED)
========================= */
export const updateOrder = async (req, res) => {
  try {
    const { status, note } = req.body;

    // ✅ danh sách trạng thái hợp lệ
    const validStatus = [
      "pending",
      "producing",
      "transporting",
      "waiting_payment",
      "completed",
      "cancelled",
    ];

    if (!status || !validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    // tìm order
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ✅ flow chuẩn
    const flow = [
      "pending",
      "producing",
      "transporting",
      "waiting_payment",
      "completed",
    ];

    const currentIndex = flow.indexOf(order.status);
    const newIndex = flow.indexOf(status);

    // ❌ không cho quay ngược (trừ cancel)
    if (status !== "cancelled" && newIndex < currentIndex) {
      return res.status(400).json({
        message: "Không thể quay lại trạng thái trước",
      });
    }

    // ❌ không cho completed nếu chưa thanh toán
    if (status === "completed") {
      const payment = await Payment.findOne({ orderId: order._id });

      if (!payment) {
        return res.status(400).json({
          message: "Chưa thanh toán, không thể hoàn thành",
        });
      }
    }

    // update
    order.status = status;

    if (note) {
      order.note = note;
    }

    await order.save();

    return res.json({
      message: "Cập nhật trạng thái thành công",
      order,
    });
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/* =========================
   DELETE ORDER
========================= */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const details = await OrderDetail.find({
      orderId: order._id,
    });

    for (const d of details) {
      await ProductionTask.deleteMany({
        orderDetailId: d._id,
      });
    }

    await OrderDetail.deleteMany({ orderId: order._id });
    await Payment.deleteMany({ orderId: order._id });
    await Order.findByIdAndDelete(order._id);

    return res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
