import OrderDetail from "../models/OrderDetail.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ProductionTask from "../models/ProductionTask.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// CREATE
export const createOrderDetail = async (req, res) => {
  try {
    const { orderId, productId, quantity, price, note } = req.body;
    // validate
    if (!orderId || !productId || !quantity || !price) {
      return badRequest(res, "Missing required fields");
    }
    const order = await Order.findById(orderId);
    const product = await Product.findById(productId);
    if (!order) return notFound(res, "Order not found");
    if (!product) return notFound(res, "Product not found");
    const detail = new OrderDetail({
      orderId,
      productId,
      quantity,
      price,
      note,
    });
    const saved = await detail.save();
    // update total order
    const allDetails = await OrderDetail.find({ orderId: order._id });
    let total = 0;
    for (let d of allDetails) {
      total += d.quantity * d.price;
    }
    order.subtotal = total;
    order.totalAmount = total - (order.discount || 0);
    await order.save();
    return createdResponse(res, saved, "Order detail created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET ALL
export const getAllOrderDetails = async (req, res) => {
  try {
    const list = await OrderDetail.find()
      .populate("orderId")
      .populate("productId");
    return successResponse(res, list, "Order details fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET BY ID
export const getOrderDetailById = async (req, res) => {
  try {
    const item = await OrderDetail.findById(req.params.id)
      .populate("orderId")
      .populate("productId");
    if (!item) {
      return notFound(res, "Order detail not found");
    }
    return successResponse(res, item, "Order detail fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE
export const updateOrderDetail = async (req, res) => {
  try {
    const oldDetail = await OrderDetail.findById(req.params.id);
    if (!oldDetail) {
      return notFound(res, "Order detail not found");
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
    order.subtotal = total;
    order.totalAmount = total - (order.discount || 0);
    await order.save();
    return successResponse(res, updated, "Order detail updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE
export const deleteOrderDetail = async (req, res) => {
  try {
    const detail = await OrderDetail.findById(req.params.id);
    if (!detail) {
      return notFound(res, "Order detail not found");
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
    order.subtotal = total;
    order.totalAmount = total - (order.discount || 0);
    await order.save();
    return successResponse(res, null, "Order detail deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
