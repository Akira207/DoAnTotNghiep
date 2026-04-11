import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import ProductionTask from "../models/ProductionTask.js";
import Payment from "../models/Payment.js";
import Customer from "../models/Customer.js";

// CREATE FULL ORDER
export const createFullOrder = async (req, res) => {
  try {
    const { customerId, products, payment, note } = req.body;
    // validate
    if (!customerId || !products || products.length === 0) {
      return res.status(400).json({ message: "Missing required data" });
    }
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // tạo order
    const order = new Order({
      customerId,
      orderDate: new Date(),
      status: "created",
      note
    });
    const savedOrder = await order.save();
    let totalAmount = 0;
    const allowedSource = ["production", "warehouse"];
    // tạo order details
    for (let item of products) {
      if (!allowedSource.includes(item.source)) {
        return res.status(400).json({ message: "Invalid source" });
      }
      const detail = new OrderDetail({
        orderId: savedOrder._id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });
      const savedDetail = await detail.save();
      totalAmount += item.quantity * item.price;
      // nếu sản xuất → tạo task
      if (item.source === "production") {
        const task = new ProductionTask({
          orderDetailId: savedDetail._id,
          status: "pending"
        });
        await task.save();
      }
      // nếu warehouse → có thể trừ kho ở đây (nâng cấp sau)
    }
    // cập nhật tổng tiền
    savedOrder.totalAmount = totalAmount;
    await savedOrder.save();
    // payment
    if (payment) {
      if (payment.amount < totalAmount) {
        return res.status(400).json({ message: "Payment not enough" });
      }
      const paymentDoc = new Payment({
        orderId: savedOrder._id,
        amount: payment.amount,
        paymentDate: new Date(),
        paymentMethod: payment.method,
        status: "paid"
      });
      await paymentDoc.save();
    }
    res.status(201).json({
      message: "Order created successfully",
      orderId: savedOrder._id,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message
    });
  }
};

// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ORDER BY ID + DETAILS
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customerId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const details = await OrderDetail.find({ orderId: order._id })
      .populate("productId");
    res.json({
      order,
      details
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE ORDER
export const updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE ORDER (xóa cả detail + task + payment)
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const details = await OrderDetail.find({ orderId: order._id });
    for (let d of details) {
      await ProductionTask.deleteMany({ orderDetailId: d._id });
    }
    await OrderDetail.deleteMany({ orderId: order._id });
    await Payment.deleteMany({ orderId: order._id });
    await Order.findByIdAndDelete(order._id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};