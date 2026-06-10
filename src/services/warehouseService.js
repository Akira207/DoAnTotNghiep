import api from "./api";

const API = "/warehouse";

export const getWarehouse = async () => {
  const res = await api.get(API);
  return res.data.data || res.data;
};

export const getWarehouseById = async (id) => {
  const res = await api.get(`${API}/${id}`);
  return res.data.data || res.data;
};

export const createWarehouse = async (warehouseData) => {
  const res = await api.post(API, warehouseData);
  return res.data.data || res.data;
};

export const updateWarehouse = async (id, warehouseData) => {
  const res = await api.put(`${API}/${id}`, warehouseData);
  return res.data.data || res.data;
};

export const deleteWarehouse = async (id) => {
  const res = await api.delete(`${API}/${id}`);
  return res.data.data || res.data;
};
