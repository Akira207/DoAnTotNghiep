import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import accessoryRoutes from "./routes/accessoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderDetailRoutes from "./routes/orderDetailRoutes.js";
import productionTaskRoutes from "./routes/productionTaskRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import materialImportRoutes from "./routes/materialImportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import warehouseRoutes from "./routes/warehouseRoutes.js";

dotenv.config();

const app = express();

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Furniture Workshop API Running");
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/accessories", accessoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-details", orderDetailRoutes);
app.use("/api/production-tasks", productionTaskRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/material-imports", materialImportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/warehouse", warehouseRoutes);
 
// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});