import MaterialImport from "../models/MaterialImport.js";
import Order from "../models/Order.js";
import ProductionTask from "../models/ProductionTask.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/* =========================
   GET GENERAL STATS
   ========================= */
export const getGeneralStats = async (req, res) => {
  try {
    const materialImports = await MaterialImport.find();
    const totalCost = materialImports.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find({ status: { $ne: "cancelled" } });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const uniqueCustomers = new Set(orders.map(o => o.customerId.toString())).size;

    return successResponse(res, {
      totalRevenue,
      totalCost,
      totalOrders,
      totalCustomers: uniqueCustomers,
      profit: totalRevenue - totalCost,
    }, "General stats fetched successfully");
  } catch (error) {
    console.error("GET STATS ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   GET REVENUE DATA FOR CHART
   ========================= */
export const getRevenueData = async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $ne: "cancelled" }
    }).sort({ orderDate: 1 });

    const materialImports = await MaterialImport.find();
    const totalMaterialCostAllTime = materialImports.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    const revenueByMonth = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    orders.forEach(order => {
      const date = new Date(order.orderDate);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const key = `${months[monthIndex]} ${year}`;
      revenueByMonth[key] = (revenueByMonth[key] || 0) + order.totalAmount;
    });

    const totalRevenueAllTime = Object.values(revenueByMonth).reduce((sum, val) => sum + val, 0) || 1;

    const result = Object.keys(revenueByMonth).map(label => {
      const rev = revenueByMonth[label];
      const cost = (rev / totalRevenueAllTime) * totalMaterialCostAllTime;
      return { label, revenue: rev, cost: cost };
    });

    return successResponse(res, result, "Revenue data fetched successfully");
  } catch (error) {
    console.error("GET REVENUE DATA ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   GET ORDER STATUS DISTRIBUTION
   ========================= */
export const getOrderStatusDistribution = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const distribution = {
      "in-progress": 0,
      "pending": 0,
      "completed": 0,
      "cancelled": 0,
    };

    stats.forEach(item => {
      if (distribution[item._id] !== undefined) {
        distribution[item._id] = item.count;
      } else if (item._id === "producing") {
        distribution["in-progress"] = item.count;
      }
    });

    return successResponse(res, distribution, "Status distribution fetched successfully");
  } catch (error) {
    console.error("GET STATUS DISTRIBUTION ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};

/* =========================
   GET PRODUCTION REPORT
   ========================= */
export const getProductionReport = async (req, res) => {
  try {
    const tasks = await ProductionTask.find()
      .sort({ createdAt: -1 })
      .populate("productId")
      .populate({
        path: "orderDetailId",
        populate: { path: "productId" },
      })
      .populate("workerId", "username role")
      .populate({
        path: "orderId",
        populate: { path: "customerId" },
      });

    const resolvedResult = await Promise.all(tasks.map(async (task) => {
      const product = task.productId || task.orderDetailId?.productId || null;
      const order = task.orderId;
      const estimatedCost = product ? (product.price || 0) * task.quantity : 0;

      return {
        ...task.toObject(),
        productName: product?.name || "N/A",
        customerName: order?.customerId?.name || "N/A",
        estimatedCost: estimatedCost,
        product,
      };
    }));

    return successResponse(res, resolvedResult, "Production report fetched successfully");
  } catch (error) {
    console.error("GET PRODUCTION REPORT ERROR:", error);
    return errorResponse(res, 500, error.message);
  }
};
