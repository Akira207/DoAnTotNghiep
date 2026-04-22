import axios from "axios";

const API = "http://localhost:5000/api/production-tasks";

// GET ALL TASKS
export const getProductionTasks = async (status) => {
  const res = await axios.get(API, {
    params: status ? { status } : {},
  });
  return res.data;
};

// GET BY ID
export const getProductionTaskById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

// CREATE
export const createProductionTask = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateProductionTaskStatus = async (id, status) => {
  const res = await axios.put(`${API}/production-tasks/${id}`, {
    status,
  });

  return res.data;
};
// DELETE
export const deleteProductionTask = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
