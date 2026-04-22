import axios from "axios";

const API = "http://localhost:5000/api/products";

// GET
export const getProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

// GET ALL
export const getAllProducts = async () => {
  const res = await axios.get(API);
  return res.data;
};

// CREATE (UPLOAD ẢNH)
export const createProduct = async (formData) => {
  const res = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// UPDATE
export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

// DELETE
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};