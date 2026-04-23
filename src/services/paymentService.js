import axios from "axios";

const API_URL = "http://localhost:5000/api/payments";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL PAYMENTS
export const getPayments = async () => {
  const res = await axios.get(API_URL);
  const data = getResponseData(res);
  return data.data || data;
};

// GET PAYMENT BY ID
export const getPaymentById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE PAYMENT
export const createPayment = async (paymentData) => {
  const res = await axios.post(API_URL, paymentData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE PAYMENT
export const updatePayment = async (id, paymentData) => {
  const res = await axios.put(`${API_URL}/${id}`, paymentData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE PAYMENT
export const deletePayment = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};