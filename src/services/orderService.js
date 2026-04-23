import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL ORDERS
export const getOrders = async () => {
  const res = await axios.get(API_URL);
  const data = getResponseData(res);
  return data.data || data;
};

// GET ORDER BY ID
export const getOrderById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE FULL ORDER
export const createOrder = async (orderData) => {
  const res = await axios.post(`${API_URL}/create-full-order`, orderData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE ORDER
export const updateOrder = async (id, updateData) => {
  const res = await axios.put(`${API_URL}/${id}`, updateData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE ORDER
export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};