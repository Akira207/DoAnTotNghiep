import axios from "axios";

const API_URL = "http://localhost:5000/api/order-details";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL ORDER DETAILS
export const getOrderDetails = async () => {
  const res = await axios.get(API_URL);
  const data = getResponseData(res);
  return data.data || data;
};

// GET ORDER DETAIL BY ID
export const getOrderDetailById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE ORDER DETAIL
export const createOrderDetail = async (detailData) => {
  const res = await axios.post(API_URL, detailData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE ORDER DETAIL
export const updateOrderDetail = async (id, detailData) => {
  const res = await axios.put(`${API_URL}/${id}`, detailData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE ORDER DETAIL
export const deleteOrderDetail = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};