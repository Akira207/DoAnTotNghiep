import axios from "axios";

const API = "http://localhost:5000/api/production-tasks";

const getResponseData = (response) => response.data || response;

// GET ALL TASKS
export const getProductionTasks = async (status, search = "") => {
  const res = await axios.get(API, {
    params: {
      status: status || undefined,
      search: search || undefined,
    },
  });
  const data = getResponseData(res);
  return data.data || data;
};

// GET TASK BY ID
export const getProductionTaskById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE TASK
export const createProductionTask = async (taskData) => {
  const res = await axios.post(API, taskData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE TASK
export const updateProductionTask = async (id, taskData) => {
  const res = await axios.put(`${API}/${id}`, taskData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE TASK
export const deleteProductionTask = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};
