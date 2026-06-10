import api from "./api";

const API = "/users";

export const getUsers = async () => {
  const res = await api.get(API);
  return res.data.data || res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`${API}/${id}`);
  return res.data.data || res.data;
};

export const createUser = async (userData) => {
  const res = await api.post(API, userData);
  return res.data.data || res.data;
};

export const updateUser = async (id, userData) => {
  const res = await api.put(`${API}/${id}`, userData);
  return res.data.data || res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`${API}/${id}`);
  return res.data.data || res.data;
};
