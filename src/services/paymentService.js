import api from "./api";

const API_URL = "/payments";

export const getPayments = async () => {
  const res = await api.get(API_URL);
  return res.data.data || res.data;
};

export const getPaymentById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
};

export const createPayment = async (paymentData) => {
  const res = await api.post(API_URL, paymentData);
  return res.data.data || res.data;
};

export const updatePayment = async (id, paymentData) => {
  const res = await api.put(`${API_URL}/${id}`, paymentData);
  return res.data.data || res.data;
};

export const deletePayment = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data.data || res.data;
};
