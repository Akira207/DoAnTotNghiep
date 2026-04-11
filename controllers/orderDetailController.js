import OrderDetail from "../models/OrderDetail.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ProductionTask from "../models/ProductionTask.js";

// CREATE
export const createOrderDetail = async (req, res) => {
  try {
    const { orderId, productId, quantity, price, note } = req.body;
    // validate
    if (!orderId || !productId || !quantity || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const order = await Order.findById(orderId);
    const product = await Product.findById(productId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (!product) return res.status(404).json({ message: "Product not found" });
    const detail = new OrderDetail({
      orderId,
      productId,
      quantity,
      price,
      note,
    });
    const saved = await detail.save();
    // update total order
    order.totalAmount = (order.totalAmount || 0) + quantity * price;
    await order.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getAllOrderDetails = async (req, res) => {
  try {
    const list = await OrderDetail.find()
      .populate("orderId")
      .populate("productId");
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
export const getOrderDetailById = async (req, res) => {
  try {
    const item = await OrderDetail.findById(req.params.id)
      .populate("orderId")
      .populate("productId");
    if (!item) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateOrderDetail = async (req, res) => {
  try {
    const oldDetail = await OrderDetail.findById(req.params.id);
    if (!oldDetail) {
      return res.status(404).json({ message: "Not found" });
    }
    const updated = await OrderDetail.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    // update lại totalAmount
    const order = await Order.findById(oldDetail.orderId);
    const allDetails = await OrderDetail.find({ orderId: order._id });
    let total = 0;
    for (let d of allDetails) {
      total += d.quantity * d.price;
    }
    order.totalAmount = total;
    await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteOrderDetail = async (req, res) => {
  try {
    const detail = await OrderDetail.findById(req.params.id);
    if (!detail) {
      return res.status(404).json({ message: "Not found" });
    }
    // xoá production task liên quan
    await ProductionTask.deleteMany({ orderDetailId: detail._id });
    await OrderDetail.findByIdAndDelete(req.params.id);
    // update total order
    const order = await Order.findById(detail.orderId);
    const allDetails = await OrderDetail.find({ orderId: order._id });
    let total = 0;
    for (let d of allDetails) {
      total += d.quantity * d.price;
    }
    order.totalAmount = total;
    await order.save();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
