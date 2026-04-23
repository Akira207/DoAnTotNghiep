import axios from "axios";

const API = "http://localhost:5000/api/accessories";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL ACCESSORIES
export const getAccessories = async () => {
  const res = await axios.get(API);
  const data = getResponseData(res);
  return data.data || data;
};

// GET ACCESSORY BY ID
export const getAccessoryById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE ACCESSORY
export const createAccessory = async (accessoryData) => {
  const res = await axios.post(API, accessoryData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE ACCESSORY
export const updateAccessory = async (id, accessoryData) => {
  const res = await axios.put(`${API}/${id}`, accessoryData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE ACCESSORY
export const deleteAccessory = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};
