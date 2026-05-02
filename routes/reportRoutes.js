import express from "express";
import {
  getGeneralStats,
  getRevenueData,
  getOrderStatusDistribution,
  getProductionReport
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tất cả các route báo cáo yêu cầu quyền admin/auth
router.use(protect);

router.get("/stats", getGeneralStats);
router.get("/revenue", getRevenueData);
router.get("/status-distribution", getOrderStatusDistribution);
router.get("/production", getProductionReport);

export default router;
