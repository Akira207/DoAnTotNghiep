import api from "./api";

const API_URL = "/orders";

export const getOrders = async () => {
  const res = await api.get(API_URL);
  return res.data.data || res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
};

export const createOrder = async (orderData) => {
  const res = await api.post(`${API_URL}/create-full-order`, orderData);
  return res.data.data || res.data;
};

export const updateOrder = async (id, updateData) => {
  const res = await api.put(`${API_URL}/${id}`, updateData);
  return res.data.data || res.data;
};

export const deleteOrder = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data.data || res.data;
};
