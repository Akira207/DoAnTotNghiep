import axios from "axios";

const API = "http://localhost:5000/api/warehouse";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL WAREHOUSE ITEMS
export const getWarehouse = async () => {
  const res = await axios.get(API);
  const data = getResponseData(res);
  return data.data || data;
};

// GET WAREHOUSE ITEM BY ID
export const getWarehouseById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE WAREHOUSE ITEM
export const createWarehouse = async (warehouseData) => {
  const res = await axios.post(API, warehouseData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE WAREHOUSE ITEM
export const updateWarehouse = async (id, warehouseData) => {
  const res = await axios.put(`${API}/${id}`, warehouseData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE WAREHOUSE ITEM
export const deleteWarehouse = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};
