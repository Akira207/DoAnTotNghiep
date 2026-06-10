import api from "./api";

const API = "/accessories";

// GET ALL (có query)
export const getAccessories = async ({
  keyword = "",
  page = 1,
  limit = 8,
} = {}) => {
  const res = await api.get(API, {
    params: { keyword, page, limit },
  });

  return res.data.data; // { data, page, totalPages }
};

// CREATE (upload ảnh)
export const createAccessory = async (formData) => {
  const res = await api.post(API, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};

// UPDATE
export const updateAccessory = async (id, formData) => {
  const res = await api.put(`${API}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data;
};

// DELETE
export const deleteAccessory = async (id) => {
  await api.delete(`${API}/${id}`);
};
