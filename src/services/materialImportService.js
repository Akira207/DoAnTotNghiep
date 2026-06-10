import api from "./api";

const API = "/material-imports";

// GET ALL MATERIAL IMPORTS
export const getMaterialImports = async (search = "", page = 1) => {
  const res = await api.get(API, {
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
  const res = await api.get(`${API}/${id}`);
  return res.data.data || res.data;
};

// CREATE MATERIAL IMPORT
export const createMaterialImport = async (materialData) => {
  const res = await api.post(API, materialData);
  return res.data.data || res.data;
};

// UPDATE MATERIAL IMPORT
export const updateMaterialImport = async (id, materialData) => {
  const res = await api.put(`${API}/${id}`, materialData);
  return res.data.data || res.data;
};

// DELETE MATERIAL IMPORT
export const deleteMaterialImport = async (id) => {
  const res = await api.delete(`${API}/${id}`);
  return res.data.data || res.data;
};
