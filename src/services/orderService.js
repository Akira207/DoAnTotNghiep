import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// GET ALL ORDERS
export const getOrders = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// GET ORDER BY ID
export const getOrderById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// CREATE FULL ORDER
export const createOrder = async (data) => {
  const res = await axios.post(`${API_URL}/create-full-order`, data);
  return res.data;
};

// UPDATE ORDER
export const updateOrder = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// DELETE ORDER
export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};