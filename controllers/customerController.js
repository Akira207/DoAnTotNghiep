import Customer from "../models/Customer.js";

// CREATE CUSTOMER
export const createCustomer = async (req, res) => {
  try {
    const { name, phone, address, type } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }
    const customer = new Customer({
      name,
      phone,
      address,
      type,
    });
    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL CUSTOMERS
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CUSTOMER BY ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CUSTOMER
export const updateCustomer = async (req, res) => {
  try {
    const { name, phone, address, type } = req.body;
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, phone, address, type }, // chỉ update field cho phép
      { new: true },
    );
    if (!updated) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CUSTOMER
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
