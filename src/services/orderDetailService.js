import api from "./api";

const API_URL = "/order-details";

export const getOrderDetails = async () => {
  const res = await api.get(API_URL);
  return res.data.data || res.data;
};

export const getOrderDetailById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data.data || res.data;
};

export const createOrderDetail = async (detailData) => {
  const res = await api.post(API_URL, detailData);
  return res.data.data || res.data;
};

export const updateOrderDetail = async (id, detailData) => {
  const res = await api.put(`${API_URL}/${id}`, detailData);
  return res.data.data || res.data;
};

export const deleteOrderDetail = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data.data || res.data;
};
