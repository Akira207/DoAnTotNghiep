import Customer from "../models/Customer.js";
import Order from "../models/Order.js";
import {
  successResponse,
  createdResponse,
  badRequest,
  notFound,
  errorResponse,
} from "../utils/apiResponse.js";

// CREATE CUSTOMER
export const createCustomer = async (req, res) => {
  try {
    const { name, phone, address, type } = req.body;
    if (!name || !phone) {
      return badRequest(res, "Name and phone are required");
    }
    const customer = new Customer({
      name,
      phone,
      address,
      type,
    });
    const saved = await customer.save();
    return createdResponse(res, saved, "Customer created successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    // 🔥 tính công nợ
    const customersWithDebt = await Promise.all(
      customers.map(async (c) => {
        const orders = await Order.find({
          customerId: c._id,
          status: { $ne: "completed" }, // chưa hoàn thành
        });

        const debt = orders.reduce((sum, o) => sum + (o.remainingAmount || 0), 0);

        return {
          ...c.toObject(),
          debt,
        };
      }),
    );

    return successResponse(res, customersWithDebt);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// GET CUSTOMER BY ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return notFound(res, "Customer not found");
    }
    return successResponse(res, customer, "Customer fetched successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// UPDATE CUSTOMER
export const updateCustomer = async (req, res) => {
  try {
    const { name, phone, address, type } = req.body;
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, phone, address, type },
      { new: true },
    );
    if (!updated) {
      return notFound(res, "Customer not found");
    }
    return successResponse(res, updated, "Customer updated successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// DELETE CUSTOMER
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return notFound(res, "Customer not found");
    }
    return successResponse(res, null, "Customer deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
