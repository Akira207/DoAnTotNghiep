import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

/* =========================
   GET ALL PAYMENTS
========================= */
export const getPayments = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

/* =========================
   GET PAYMENT BY ID
========================= */
export const getPaymentById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

/* =========================
   CREATE PAYMENT
========================= */
export const createPayment = async (data) => {
  // data = { orderId, amount, paymentMethod, status }
  const res = await axios.post(API_URL, data);
  return res.data;
};

/* =========================
   UPDATE PAYMENT
========================= */
export const updatePayment = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

/* =========================
   DELETE PAYMENT
========================= */
export const deletePayment = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};