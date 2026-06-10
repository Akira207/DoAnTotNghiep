import api from "./api";

const API = "/customers";

export const getCustomers = async () => {
  const res = await api.get(API);
  return res.data.data || res.data;
};

export const getCustomerById = async (id) => {
  const res = await api.get(`${API}/${id}`);
  return res.data.data || res.data;
};

export const createCustomer = async (customerData) => {
  const res = await api.post(API, customerData);
  return res.data.data || res.data;
};

export const updateCustomer = async (id, customerData) => {
  const res = await api.put(`${API}/${id}`, customerData);
  return res.data.data || res.data;
};

export const deleteCustomer = async (id) => {
  const res = await api.delete(`${API}/${id}`);
  return res.data.data || res.data;
};
