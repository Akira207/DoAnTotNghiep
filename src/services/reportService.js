import api from "./api";

const API_URL = "/reports";

export const getGeneralStats = async () => {
  const response = await api.get(`${API_URL}/stats`);
  return response.data.data;
};

export const getRevenueData = async () => {
  const response = await api.get(`${API_URL}/revenue`);
  return response.data.data;
};

export const getOrderStatusDistribution = async () => {
  const response = await api.get(`${API_URL}/status-distribution`);
  return response.data.data;
};

export const getProductionReport = async () => {
  const response = await api.get(`${API_URL}/production`);
  return response.data.data;
};
