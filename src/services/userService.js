import axios from "axios";

const API = "http://localhost:5000/api/users";

// GET ALL
export const getUsers = async () => {
  const res = await axios.get(API);
  return res.data.data || res.data;
};

// CREATE
export const createUser = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

// UPDATE
export const updateUser = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

// DELETE
export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};