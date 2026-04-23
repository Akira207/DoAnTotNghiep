import axios from "axios";

const API = "http://localhost:5000/api/customers";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL CUSTOMERS
export const getCustomers = async () => {
  const res = await axios.get(API);
  const data = getResponseData(res);
  return data.data || data;
};

// GET CUSTOMER BY ID
export const getCustomerById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE CUSTOMER
export const createCustomer = async (customerData) => {
  const res = await axios.post(API, customerData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE CUSTOMER
export const updateCustomer = async (id, customerData) => {
  const res = await axios.put(`${API}/${id}`, customerData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE CUSTOMER
export const deleteCustomer = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};