import axios from "axios";

const API = "http://localhost:5000/api/customers";

// GET ALL
export const getCustomers = async () => {
  const res = await axios.get(API);
  return res.data;
};

// CREATE
export const createCustomer = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

// UPDATE
export const updateCustomer = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

// DELETE
export const deleteCustomer = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};