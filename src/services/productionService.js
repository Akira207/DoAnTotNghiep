import api from "./api";

const API = "/production-tasks";

const getResponseData = (response) => response.data || response;

// GET ALL TASKS
export const getProductionTasks = async (status, search = "") => {
  const res = await api.get(API, {
    params: {
      status: status || undefined,
      search: search || undefined,
    },
  });
  return res.data.data || res.data;
};

// GET TASK BY ID
export const getProductionTaskById = async (id) => {
  const res = await api.get(`${API}/${id}`);
  return res.data.data || res.data;
};

// CREATE TASK
export const createProductionTask = async (taskData) => {
  const res = await api.post(API, taskData);
  return res.data.data || res.data;
};

// UPDATE TASK
export const updateProductionTask = async (id, taskData) => {
  const res = await api.put(`${API}/${id}`, taskData);
  return res.data.data || res.data;
};

// DELETE TASK
export const deleteProductionTask = async (id) => {
  const res = await api.delete(`${API}/${id}`);
  return res.data.data || res.data;
};
