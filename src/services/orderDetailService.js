import axios from "axios";

const API_URL = "http://localhost:5000/api/order-details";

/* =========================
   GET ALL ORDER DETAILS
========================= */
export const getOrderDetails = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

/* =========================
   GET ORDER DETAIL BY ID
========================= */
export const getOrderDetailById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

/* =========================
   CREATE ORDER DETAIL
========================= */
export const createOrderDetail = async (data) => {
  // data = { orderId, productId, quantity, price, note }
  const res = await axios.post(API_URL, data);
  return res.data;
};

/* =========================
   UPDATE ORDER DETAIL
========================= */
export const updateOrderDetail = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

/* =========================
   DELETE ORDER DETAIL
========================= */
export const deleteOrderDetail = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};