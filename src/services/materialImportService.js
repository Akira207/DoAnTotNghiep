import axios from "axios";

const API = "http://localhost:5000/api/material-imports";

// ✅ Helper to extract data from API response
const getResponseData = (response) => response.data || response;

// GET ALL MATERIAL IMPORTS
export const getMaterialImports = async (search = "", page = 1) => {
  const res = await axios.get(API, {
    params: {
      materialName: search,
      page,
      limit: 10,
    },
  });

  return res.data.data;
};

// GET MATERIAL IMPORT BY ID
export const getMaterialImportById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};

// CREATE MATERIAL IMPORT
export const createMaterialImport = async (materialData) => {
  const res = await axios.post(API, materialData);
  const data = getResponseData(res);
  return data.data || data;
};

// UPDATE MATERIAL IMPORT
export const updateMaterialImport = async (id, materialData) => {
  const res = await axios.put(`${API}/${id}`, materialData);
  const data = getResponseData(res);
  return data.data || data;
};

// DELETE MATERIAL IMPORT
export const deleteMaterialImport = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  const data = getResponseData(res);
  return data.data || data;
};
