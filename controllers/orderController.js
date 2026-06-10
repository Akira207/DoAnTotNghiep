import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import ProductionTask from "../models/ProductionTask.js";
import Payment from "../models/Payment.js";
import Customer from "../models/Customer.js";
import Warehouse from "../models/WareHouse.js";

import { generateOrderCode } from "../utils/generateOrderCode.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

export const createFullOrder = async (req, res) => {
  try {
    const { customerId, products, payment, note, discount } = req.body;
    if (!customerId || !Array.isArray(products) || products.length === 0) {
      return badRequest(res, "Missing required data");
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return notFound(res, "Customer not found");
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

        return badRequest(res, "Invalid product data");
      }

      const itemTotal = item.quantity * item.price;

      const detail = await new OrderDetail({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        totalPrice: itemTotal,
      }).save();

      totalAmount += itemTotal;

      if (item.source === "production") {
        await new ProductionTask({
          type: "order",
          orderId: order._id,
          orderDetailId: detail._id,
          productId: item.productId,
          quantity: item.quantity,
          batch: 1,
          status: "pending",
        }).save();
      } else if (item.source === "warehouse") {
        const warehouseItem = await Warehouse.findOne({
          productId: item.productId,
        });
        if (!warehouseItem || warehouseItem.quantity < item.quantity) {
          await Order.findByIdAndDelete(order._id);
          return badRequest(
            res,
            `Sản phẩm ${item.productId} không đủ số lượng trong kho`,
          );
        }

        warehouseItem.reservedQuantity += item.quantity;

        if (warehouseItem.reservedQuantity > 0) {
          warehouseItem.status = "ready_to_ship";
        }

        await warehouseItem.save();
      }
    }

    const total = totalAmount - (Number(discount) || 0);

    const depositAmount = payment?.amount || 0;
    const remainingAmount = total - depositAmount;

    order.subtotal = totalAmount;
    order.discount = Number(discount) || 0;
    order.totalAmount = total;
    order.depositAmount = depositAmount;
    order.remainingAmount = remainingAmount;

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

    return createdResponse(
      res,
      {
        orderId: order._id,
        orderCode,
        subtotal: order.subtotal,
        totalAmount: order.totalAmount,
        depositAmount: order.depositAmount,
        remainingAmount: order.remainingAmount,
        payment: savedPayment,
      },
      "Order created successfully",
    );
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customerId")
      .sort({ createdAt: -1 });

    return successResponse(res, orders, "Orders fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customerId");

    if (!order) {
      return notFound(res, "Order not found");
    }

    const [detailsRaw, payments] = await Promise.all([
      OrderDetail.find({ orderId: order._id }).populate("productId"),
      Payment.find({ orderId: order._id }),
    ]);

    const details = await Promise.all(
      detailsRaw.map(async (detail) => {
        const task = await ProductionTask.findOne({
          orderDetailId: detail._id,
        });
        return {
          ...detail.toObject(),
          productionStatus: task ? task.status : "no_task",
        };
      }),
    );

    return successResponse(
      res,
      { order, details, payment: payments },
      "Order fetched successfully",
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { status, note } = req.body;

    const validStatus = [
      "pending",
      "producing",
      "transporting",
      "waiting_payment",
      "completed",
      "cancelled",
    ];

    if (!status || !validStatus.includes(status)) {
      return badRequest(res, "Invalid status");
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return notFound(res, "Order not found");
    }

    if (order.status === "cancelled") {
      return badRequest(res, "Đơn hàng đã bị huỷ, không thể chỉnh sửa");
    }

    if (order.status === "completed") {
      const { reason } = req.body;
      if (!reason) {
        return badRequest(res, "Đơn hàng đã hoàn thành, vui lòng cung cấp lý do để chỉnh sửa");
      }
    }

    if (order.status === "cancelled") {
      return badRequest(res, "Đơn hàng đã bị huỷ, không thể chỉnh sửa");
    }

    if (order.status === "completed") {
      const { reason } = req.body;
      if (!reason) {
        return badRequest(res, "Đơn hàng đã hoàn thành, vui lòng cung cấp lý do để chỉnh sửa");
      }
    }

    const flow = [
      "pending",
      "producing",
      "transporting",
      "waiting_payment",
      "completed",
    ];

    const currentIndex = flow.indexOf(order.status);
    const newIndex = flow.indexOf(status);

    if (status !== "cancelled" && newIndex < currentIndex) {
      return badRequest(res, "Không thể quay lại trạng thái trước");
    }

    if (status === "completed") {
      const payments = await Payment.find({ orderId: order._id });
      const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

      if (totalPaid < order.totalAmount) {
        return badRequest(res, "Chưa thanh toán đủ, không thể hoàn thành");
      }
    }

    if (["transporting", "completed", "waiting_payment"].includes(status)) {
      const pendingTasks = await ProductionTask.find({
        orderId: order._id,
        status: { $ne: "completed" },
      });

      if (pendingTasks.length > 0) {
        return badRequest(
          res,
          "Không thể cập nhật vì có sản phẩm chưa hoàn thành sản xuất",
        );
      }
    }

    const oldStatus = order.status;
    const newStatus = status;

    const details = await OrderDetail.find({ orderId: order._id });

    if (details && details.length > 0) {
      for (const detail of details) {
        const warehouseItem = await Warehouse.findOne({
          productId: detail.productId,
        });
        if (warehouseItem) {
          if (newStatus === "transporting" || newStatus === "completed") {
            // Nếu trước đó chưa trừ kho (chưa từng ở trạng thái vận chuyển/hoàn thành)
            if (oldStatus !== "transporting" && oldStatus !== "completed") {
              warehouseItem.quantity -= detail.quantity;
              warehouseItem.reservedQuantity = Math.max(0, warehouseItem.reservedQuantity - detail.quantity);

              // Cập nhật trạng thái kho sau khi trừ
              if (warehouseItem.quantity <= 0) {
                warehouseItem.status = "out_of_stock";
              } else if (warehouseItem.quantity < 10) {
                warehouseItem.status = "low_stock";
              } else {
                warehouseItem.status = "in_stock";
              }
              await warehouseItem.save();
            }
          } else if (newStatus === "cancelled") {
            // Nếu đơn hàng bị huỷ, trả lại số lượng reserved
            if (oldStatus !== "cancelled") {
              warehouseItem.reservedQuantity -= detail.quantity;

              // Cập nhật lại trạng thái kho
              if (warehouseItem.reservedQuantity === 0) {
                warehouseItem.status = "in_stock";
              }
              await warehouseItem.save();
            }
          }
        }
      }
    }

    // update
    order.status = status;

    if (note) {
      order.note = note;
    }

    await order.save();

    return successResponse(res, { order }, "Cập nhật trạng thái thành công");
  } catch (error) {
    console.error("UPDATE ORDER ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return notFound(res, "Order not found");
    }

    if (order.status === "completed") {
      return badRequest(res, "Đơn hàng đã hoàn thành, không thể xoá");
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

    return successResponse(res, null, "Order deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

