import api from "./api";

const API = "/products";

export const getAllProducts = async () => {
  const res = await api.get(API);
  return res.data.data || res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`${API}/${id}`);
  return res.data.data || res.data;
};

// CREATE PRODUCT (WITH FILE UPLOAD)
export const createProduct = async (formData) => {
  const res = await api.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data || res.data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  const res = await api.put(`${API}/${id}`, productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data || res.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const res = await api.delete(`${API}/${id}`);
  return res.data.data || res.data;
};
