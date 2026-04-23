import axios from "axios";

const API = "http://localhost:5000/api/products";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL PRODUCTS
export const getAllProducts = async () => {
  const res = await axios.get(API);
  const data = getResponseData(res);
  return data.data || data;
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE PRODUCT (WITH FILE UPLOAD)
export const createProduct = async (formData) => {
  const res = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API}/${id}`, productData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};